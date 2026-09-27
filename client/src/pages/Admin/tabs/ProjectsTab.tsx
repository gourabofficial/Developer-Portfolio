import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  Plus, Pencil, Trash2, X, Save, Upload, Loader2,
  CheckCircle, AlertCircle, RefreshCw, ExternalLink,
} from 'lucide-react';
import {
  fetchProjects, createProject, updateProject, deleteProject,
  getUploadSignature, uploadToCloudinary,
  type Project, type ProjectInput,
} from '@/lib/adminApi';
import { bustCache } from '@/lib/cloudinary';

// ── Toast ─────────────────────────────────────────────────────────────────
type ToastMsg = { id: number; type: 'success' | 'error'; text: string };

function useToast() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  let counter = useRef(0);

  function push(type: ToastMsg['type'], text: string) {
    const id = ++counter.current;
    setToasts((t) => [...t, { id, type, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }

  return { toasts, success: (t: string) => push('success', t), error: (t: string) => push('error', t) };
}

// ── Tech-tag input ────────────────────────────────────────────────────────
function TechInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState('');

  function add() {
    const t = draft.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft('');
  }

  function remove(tech: string) { onChange(value.filter((v) => v !== tech)); }

  return (
    <div className="tech-input-wrap">
      <div className="tech-chips">
        {value.map((t) => (
          <span key={t} className="tech-chip">
            {t}
            <button type="button" onClick={() => remove(t)} className="tech-chip-x" aria-label={`Remove ${t}`}>
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
      <div className="tech-add-row">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          className="admin-input tech-add-input"
          placeholder="Add tech (Enter to add)"
        />
        <button type="button" onClick={add} className="admin-btn-primary tech-add-btn" disabled={!draft.trim()}>
          Add
        </button>
      </div>
    </div>
  );
}

// ── Project form ──────────────────────────────────────────────────────────
type FormData = {
  title: string; eyebrow: string; description: string;
  overview: string; problem: string; architecture: string;
  techStack: string[]; features: string;
  liveUrl: string; githubUrl: string;
  category: string; featured: boolean; order: string;
  thumbnailUrl: string;
};

const EMPTY_FORM: FormData = {
  title: '', eyebrow: '', description: '', overview: '',
  problem: '', architecture: '', techStack: [], features: '',
  liveUrl: '', githubUrl: '', category: 'Utility',
  featured: false, order: '0', thumbnailUrl: '',
};

function projectToForm(p: Project): FormData {
  return {
    title: p.title, eyebrow: p.eyebrow, description: p.description,
    overview: p.overview, problem: p.problem, architecture: p.architecture,
    techStack: [...p.techStack], features: p.features.join('\n'),
    liveUrl: p.liveUrl, githubUrl: p.githubUrl, category: p.category,
    featured: p.featured, order: String(p.order), thumbnailUrl: p.thumbnailUrl,
  };
}

type FormProps = {
  initial: FormData;
  editSlug?: string;
  onSaved: (p: Project) => void;
  onCancel: () => void;
  toastError: (t: string) => void;
  toastSuccess: (t: string) => void;
};

function ProjectForm({ initial, editSlug, onSaved, onCancel, toastError, toastSuccess }: FormProps) {
  const [form, setForm] = useState<FormData>(initial);
  const [saving,   setSaving]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const imgRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleThumbUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !form.title) { toastError('Enter a project title first so the thumbnail slot can be named.'); return; }
    const slugId = form.title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    setUploading(true); setUploadPct(0);
    try {
      const sig    = await getUploadSignature({ type: 'project', id: slugId });
      const result = await uploadToCloudinary(file, sig, setUploadPct);
      set('thumbnailUrl', bustCache(result.secure_url));
      toastSuccess('Thumbnail uploaded!');
    } catch (err: unknown) {
      toastError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (imgRef.current) imgRef.current.value = '';
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toastError('Title and description are required.'); return;
    }
    setSaving(true);
    const payload: ProjectInput = {
      title:        form.title.trim(),
      eyebrow:      form.eyebrow.trim(),
      description:  form.description.trim(),
      overview:     form.overview.trim(),
      problem:      form.problem.trim(),
      architecture: form.architecture.trim(),
      techStack:    form.techStack,
      features:     form.features.split('\n').map((s) => s.trim()).filter(Boolean),
      liveUrl:      form.liveUrl.trim(),
      githubUrl:    form.githubUrl.trim(),
      category:     form.category.trim(),
      featured:     form.featured,
      order:        Number(form.order) || 0,
      thumbnailUrl: form.thumbnailUrl,
    };
    try {
      const r = editSlug
        ? await updateProject(editSlug, payload)
        : await createProject(payload);
      toastSuccess(editSlug ? 'Project updated!' : 'Project created!');
      onSaved(r.project);
    } catch (err: unknown) {
      toastError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="proj-form-overlay" role="dialog" aria-modal="true" aria-label={editSlug ? 'Edit project' : 'Add project'}>
      <div className="proj-form-card">
        <div className="proj-form-header">
          <h3 className="proj-form-title">{editSlug ? 'Edit project' : 'Add new project'}</h3>
          <button type="button" onClick={onCancel} className="proj-form-close" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="proj-form-body">
          <div className="pf-grid-2">
            <div className="pf-field">
              <label className="admin-field-label">Title *</label>
              <input className="admin-input" value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="Tea ERP System" />
            </div>
            <div className="pf-field">
              <label className="admin-field-label">Eyebrow / Sub-label</label>
              <input className="admin-input" value={form.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} placeholder="Enterprise ERP application" />
            </div>
          </div>

          <div className="pf-field">
            <label className="admin-field-label">Description *</label>
            <textarea className="admin-input pf-textarea" rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} required placeholder="Short description shown on project cards" />
          </div>

          <div className="pf-field">
            <label className="admin-field-label">Overview</label>
            <textarea className="admin-input pf-textarea" rows={2} value={form.overview} onChange={(e) => set('overview', e.target.value)} placeholder="One-liner for the detail page" />
          </div>

          <div className="pf-grid-2">
            <div className="pf-field">
              <label className="admin-field-label">Problem / Purpose</label>
              <textarea className="admin-input pf-textarea" rows={3} value={form.problem} onChange={(e) => set('problem', e.target.value)} />
            </div>
            <div className="pf-field">
              <label className="admin-field-label">Architecture</label>
              <textarea className="admin-input pf-textarea" rows={3} value={form.architecture} onChange={(e) => set('architecture', e.target.value)} />
            </div>
          </div>

          <div className="pf-field">
            <label className="admin-field-label">Tech Stack</label>
            <TechInput value={form.techStack} onChange={(v) => set('techStack', v)} />
          </div>

          <div className="pf-field">
            <label className="admin-field-label">Key Features <span className="pf-hint">(one per line)</span></label>
            <textarea className="admin-input pf-textarea" rows={4} value={form.features} onChange={(e) => set('features', e.target.value)} placeholder="Role-based access control&#10;Payroll module&#10;…" />
          </div>

          <div className="pf-grid-2">
            <div className="pf-field">
              <label className="admin-field-label">Live URL</label>
              <input className="admin-input" type="url" value={form.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://…" />
            </div>
            <div className="pf-field">
              <label className="admin-field-label">GitHub URL</label>
              <input className="admin-input" type="url" value={form.githubUrl} onChange={(e) => set('githubUrl', e.target.value)} placeholder="https://github.com/…" />
            </div>
          </div>

          <div className="pf-grid-3">
            <div className="pf-field">
              <label className="admin-field-label">Category</label>
              <input className="admin-input" value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Full Stack" />
            </div>
            <div className="pf-field">
              <label className="admin-field-label">Order</label>
              <input className="admin-input" type="number" value={form.order} onChange={(e) => set('order', e.target.value)} min="0" />
            </div>
            <div className="pf-field pf-toggle-field">
              <label className="admin-field-label">Featured</label>
              <label className="pf-toggle">
                <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
                <span className="pf-toggle-track"><span className="pf-toggle-thumb" /></span>
                <span className="pf-toggle-label">{form.featured ? 'Yes' : 'No'}</span>
              </label>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="pf-field">
            <label className="admin-field-label">Thumbnail</label>
            <div className="pf-thumb-row">
              {form.thumbnailUrl && (
                <div className="pf-thumb-preview">
                  <img key={form.thumbnailUrl} src={form.thumbnailUrl} alt="Thumbnail preview" className="pf-thumb-img" />
                </div>
              )}
              <div className="pf-thumb-controls">
                {uploading && (
                  <div className="upload-progress-bar" role="progressbar" aria-valuenow={uploadPct} aria-valuemin={0} aria-valuemax={100}>
                    <div className="upload-progress-fill" style={{ width: `${uploadPct}%` }} />
                  </div>
                )}
                <label className={`upload-file-btn ${uploading ? 'uploading' : ''}`}>
                  {uploading
                    ? <><Loader2 size={13} className="admin-spinner" aria-hidden /> Uploading {uploadPct}%</>
                    : form.thumbnailUrl
                      ? <><RefreshCw size={13} aria-hidden /> Replace thumbnail</>
                      : <><Upload size={13} aria-hidden /> Upload thumbnail</>
                  }
                  <input ref={imgRef} type="file" accept="image/*" onChange={handleThumbUpload} disabled={uploading} className="upload-file-input-hidden" aria-label="Upload thumbnail" />
                </label>
                <p className="pf-thumb-hint">Or enter a URL manually:</p>
                <input
                  className="admin-input"
                  type="url"
                  value={form.thumbnailUrl}
                  onChange={(e) => set('thumbnailUrl', e.target.value)}
                  placeholder="https://res.cloudinary.com/…"
                />
              </div>
            </div>
          </div>

          <div className="proj-form-actions">
            <button type="button" onClick={onCancel} className="admin-btn-ghost">Cancel</button>
            <button type="submit" className="admin-btn-primary" disabled={saving}>
              {saving
                ? <><Loader2 size={14} className="admin-spinner" aria-hidden /> Saving…</>
                : <><Save size={14} aria-hidden /> {editSlug ? 'Save changes' : 'Create project'}</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Delete confirmation ────────────────────────────────────────────────────
function DeleteConfirm({ project, onConfirm, onCancel, deleting }: {
  project: Project; onConfirm: () => void; onCancel: () => void; deleting: boolean;
}) {
  return (
    <div className="proj-form-overlay" role="dialog" aria-modal="true" aria-label="Confirm delete">
      <div className="proj-delete-card">
        <div className="proj-delete-icon" aria-hidden><Trash2 size={24} /></div>
        <h3 className="proj-delete-title">Delete "{project.title}"?</h3>
        <p className="proj-delete-body">
          This will permanently delete the project and attempt to remove its Cloudinary thumbnail.
          This action cannot be undone.
        </p>
        <div className="proj-delete-actions">
          <button type="button" onClick={onCancel} className="admin-btn-ghost" disabled={deleting}>Cancel</button>
          <button type="button" onClick={onConfirm} className="admin-btn-danger" disabled={deleting}>
            {deleting ? <><Loader2 size={14} className="admin-spinner" aria-hidden /> Deleting…</> : 'Yes, delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main tab ──────────────────────────────────────────────────────────────
export function ProjectsTab() {
  const [projects,  setProjects]  = useState<Project[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [formOpen,  setFormOpen]  = useState(false);
  const [editProj,  setEditProj]  = useState<Project | null>(null);
  const [deleteProj, setDeleteProj] = useState<Project | null>(null);
  const [deleting,   setDeleting]   = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchProjects()
      .then((r) => setProjects(r.projects))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);

  function openAdd() { setEditProj(null); setFormOpen(true); }
  function openEdit(p: Project) { setEditProj(p); setFormOpen(true); }
  function closeForm() { setFormOpen(false); setEditProj(null); }

  function handleSaved(p: Project) {
    setProjects((prev) => {
      const idx = prev.findIndex((x) => x._id === p._id);
      if (idx >= 0) { const next = [...prev]; next[idx] = p; return next; }
      return [...prev, p];
    });
    closeForm();
  }

  async function handleDelete() {
    if (!deleteProj) return;
    setDeleting(true);
    try {
      await deleteProject(deleteProj.slug);
      setProjects((prev) => prev.filter((p) => p._id !== deleteProj._id));
      toast.success(`"${deleteProj.title}" deleted.`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeleting(false);
      setDeleteProj(null);
    }
  }

  return (
    <div className="tab-section">
      {/* Toast container */}
      <div className="toast-container" aria-live="polite">
        {toast.toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.type === 'success' ? <CheckCircle size={14} aria-hidden /> : <AlertCircle size={14} aria-hidden />}
            {t.text}
          </div>
        ))}
      </div>

      <div className="tab-heading-row">
        <div>
          <h2 className="tab-title">Projects</h2>
          <p className="tab-desc">
            {loading ? '' : `${projects.length} project${projects.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button type="button" onClick={openAdd} className="admin-btn-primary">
          <Plus size={15} aria-hidden /> Add project
        </button>
      </div>

      {loading && (
        <div className="admin-loading">
          <Loader2 size={20} className="admin-spinner" /> Loading projects…
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="projects-empty">
          <p>No projects yet. Add your first one!</p>
          <button type="button" onClick={openAdd} className="admin-btn-primary">
            <Plus size={15} aria-hidden /> Add project
          </button>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="proj-cards-grid">
          {projects.map((p) => (
            <div key={p._id} className="proj-card">
              <div className="proj-card-thumb">
                {p.thumbnailUrl ? (
                  <img src={p.thumbnailUrl} alt={p.title} className="proj-card-thumb-img" loading="lazy" />
                ) : (
                  <div className="proj-card-thumb-empty">No image</div>
                )}
                {p.featured && (
                  <span className="proj-card-badge">Featured</span>
                )}
              </div>
              <div className="proj-card-body">
                <div className="proj-card-top">
                  <span className="proj-card-cat">{p.category}</span>
                  <div className="proj-card-links">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-card-ext" aria-label="Live site">
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="proj-card-title">{p.title}</h3>
                <p className="proj-card-desc">{p.description}</p>
                <div className="proj-card-actions">
                  <button type="button" onClick={() => openEdit(p)} className="proj-card-btn edit">
                    <Pencil size={13} /> Edit
                  </button>
                  <button type="button" onClick={() => setDeleteProj(p)} className="proj-card-btn delete">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <ProjectForm
          initial={editProj ? projectToForm(editProj) : EMPTY_FORM}
          editSlug={editProj?.slug}
          onSaved={handleSaved}
          onCancel={closeForm}
          toastError={toast.error}
          toastSuccess={toast.success}
        />
      )}

      {deleteProj && (
        <DeleteConfirm
          project={deleteProj}
          onConfirm={handleDelete}
          onCancel={() => setDeleteProj(null)}
          deleting={deleting}
        />
      )}
    </div>
  );
}
