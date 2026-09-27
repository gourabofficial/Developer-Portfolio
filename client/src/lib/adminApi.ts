/**
 * Admin + public API client.
 * All requests use credentials: 'include' so the HttpOnly cookie is sent.
 */

const BASE = (import.meta.env.VITE_API_URL as string) ?? 'http://localhost:5000';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
  return data as T;
}

// ── Auth ──────────────────────────────────────────────────────────────────

export const adminLogin  = (password: string) =>
  apiFetch('/api/admin/login',  { method: 'POST', body: JSON.stringify({ password }) });

export const adminLogout = () =>
  apiFetch('/api/admin/logout', { method: 'POST' });

export const adminMe = () =>
  apiFetch<{ success: boolean }>('/api/admin/me');

// ── Cloudinary signed upload ───────────────────────────────────────────────

export type SignatureResponse = {
  success: boolean;
  signature: string;
  timestamp: number;
  publicId: string;
  resourceType: 'image' | 'raw';
  apiKey: string;
  cloudName: string;
};

export type Slot = 'hero' | { type: 'project'; id: string };

export const getUploadSignature = (slot: Slot) =>
  apiFetch<SignatureResponse>('/api/upload/sign', {
    method: 'POST',
    body: JSON.stringify({ slot }),
  });

export async function uploadToCloudinary(
  file: File,
  sig: SignatureResponse,
  onProgress?: (pct: number) => void,
): Promise<{ secure_url: string; version: number }> {
  const url = `https://api.cloudinary.com/v1_1/${sig.cloudName}/${sig.resourceType}/upload`;

  const form = new FormData();
  form.append('file',       file);
  form.append('api_key',    sig.apiKey);
  form.append('timestamp',  String(sig.timestamp));
  form.append('signature',  sig.signature);
  form.append('public_id',  sig.publicId);
  form.append('overwrite',  'true');
  form.append('invalidate', 'true');

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
      };
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err?.error?.message ?? `Upload failed (${xhr.status})`));
        } catch {
          reject(new Error(`Upload failed (${xhr.status})`));
        }
      }
    };
    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(form);
  });
}

// ── Public project API ─────────────────────────────────────────────────────

export type Project = {
  _id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  overview: string;
  problem: string;
  architecture: string;
  techStack: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  thumbnailUrl: string;
  category: string;
  featured: boolean;
  order: number;
  accent: string;
  createdAt: string;
  updatedAt: string;
};

export const fetchProjects = () =>
  apiFetch<{ success: boolean; projects: Project[] }>('/api/projects');

export const fetchProject = (slug: string) =>
  apiFetch<{ success: boolean; project: Project }>(`/api/projects/${slug}`);

// ── Admin project CRUD ─────────────────────────────────────────────────────

export type ProjectInput = Partial<Omit<Project, '_id' | 'slug' | 'createdAt' | 'updatedAt'>>;

export const createProject = (data: ProjectInput) =>
  apiFetch<{ success: boolean; project: Project }>('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateProject = (slug: string, data: ProjectInput) =>
  apiFetch<{ success: boolean; project: Project }>(`/api/projects/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteProject = (slug: string) =>
  apiFetch<{ success: boolean }>(`/api/projects/${slug}`, { method: 'DELETE' });

// ── Resume ─────────────────────────────────────────────────────────────────

export const fetchResumeUrl = () =>
  apiFetch<{ success: boolean; url: string }>('/api/resume');

export const updateResumeUrl = (url: string) =>
  apiFetch<{ success: boolean; url: string }>('/api/resume', {
    method: 'PUT',
    body: JSON.stringify({ url }),
  });
