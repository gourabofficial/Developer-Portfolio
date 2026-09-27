/**
 * Admin API client — thin wrapper around fetch calls to the backend.
 * All requests use credentials: 'include' so the HttpOnly cookie is sent.
 */

const BASE = import.meta.env.VITE_API_URL as string ?? 'http://localhost:5000';

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

// ── Signature ─────────────────────────────────────────────────────────────

export type SignatureResponse = {
  success: boolean;
  signature: string;
  timestamp: number;
  publicId: string;
  resourceType: 'image' | 'raw';
  apiKey: string;
  cloudName: string;
};

export type Slot =
  | 'hero'
  | 'resume'
  | { type: 'project'; id: string };

export const getUploadSignature = (slot: Slot) =>
  apiFetch<SignatureResponse>('/api/upload/sign', {
    method: 'POST',
    body: JSON.stringify({ slot }),
  });

// ── Project list ─────────────────────────────────────────────────────────

export type AdminProject = {
  id: string;
  publicId: string;
  thumbnailUrl: string;
};

export const getAdminProjects = () =>
  apiFetch<{ success: boolean; projects: AdminProject[] }>('/api/upload/projects');

// ── Direct Cloudinary upload (browser → Cloudinary) ───────────────────────

export async function uploadToCloudinary(
  file: File,
  sig: SignatureResponse,
  onProgress?: (pct: number) => void,
): Promise<{ secure_url: string; version: number }> {
  const url = `https://api.cloudinary.com/v1_1/${sig.cloudName}/${sig.resourceType}/upload`;

  const form = new FormData();
  form.append('file', file);
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
