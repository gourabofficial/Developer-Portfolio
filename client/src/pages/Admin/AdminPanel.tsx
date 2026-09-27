/**
 * AdminPanel — shown after successful login.
 * Renders upload slots for hero photo, resume, and all project thumbnails.
 */
import { useEffect, useState } from 'react';
import { LogOut, ImageIcon, FileText, LayoutGrid, Loader2 } from 'lucide-react';
import { adminLogout, getAdminProjects, type AdminProject } from '@/lib/adminApi';
import { cloudinaryImage, cloudinaryRaw, PUBLIC_IDS } from '@/lib/cloudinary';
import { projects } from '@/data/projects';
import { UploadSlot } from './UploadSlot';

type Props = { onLogout: () => void };

export function AdminPanel({ onLogout }: Props) {
  const [adminProjects, setAdminProjects] = useState<AdminProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState('');

  useEffect(() => {
    getAdminProjects()
      .then((r) => setAdminProjects(r.projects))
      .catch((err: unknown) =>
        setProjectsError(err instanceof Error ? err.message : 'Failed to load projects'),
      )
      .finally(() => setLoadingProjects(false));
  }, []);

  async function handleLogout() {
    try { await adminLogout(); } catch { /* ignore */ }
    onLogout();
  }

  // Hero image URL (current)
  const heroUrl    = cloudinaryImage(PUBLIC_IDS.hero,   { width: 480, transforms: 'c_fill,g_face,ar_1:1' });
  const resumeUrl  = cloudinaryRaw(PUBLIC_IDS.resume);

  return (
    <div className="admin-panel">
      {/* Header */}
      <header className="admin-panel-header">
        <div>
          <h1 className="admin-panel-title">Admin Panel</h1>
          <p className="admin-panel-sub">Portfolio asset management</p>
        </div>
        <button className="admin-btn-ghost" onClick={handleLogout} aria-label="Logout">
          <LogOut size={16} aria-hidden />
          Logout
        </button>
      </header>

      <main className="admin-panel-body">

        {/* ── Hero Photo ──────────────────────────────────────────────── */}
        <section className="admin-section">
          <div className="admin-section-heading">
            <ImageIcon size={18} aria-hidden />
            <h2>Hero Profile Photo</h2>
          </div>
          <UploadSlot
            label="Profile Photo"
            hint="Replaces portfolio/hero-profile on Cloudinary. JPEG/PNG/WebP, max 10 MB."
            currentUrl={heroUrl}
            slot="hero"
            accept="image/*"
          />
        </section>

        {/* ── Resume ──────────────────────────────────────────────────── */}
        <section className="admin-section">
          <div className="admin-section-heading">
            <FileText size={18} aria-hidden />
            <h2>Resume</h2>
          </div>
          <UploadSlot
            label="Resume PDF"
            hint="Replaces portfolio/resume on Cloudinary. PDF only."
            currentUrl={resumeUrl}
            slot="resume"
            accept="application/pdf"
          />
        </section>

        {/* ── Project Thumbnails ──────────────────────────────────────── */}
        <section className="admin-section">
          <div className="admin-section-heading">
            <LayoutGrid size={18} aria-hidden />
            <h2>Project Thumbnails</h2>
          </div>

          {loadingProjects && (
            <div className="admin-loading">
              <Loader2 size={20} className="admin-spinner" />
              <span>Loading projects…</span>
            </div>
          )}

          {projectsError && (
            <p className="upload-status error" role="alert">{projectsError}</p>
          )}

          {!loadingProjects && !projectsError && (
            <div className="admin-projects-grid">
              {projects.map((proj) => {
                // Find the corresponding adminProject entry for its current URL
                const ap = adminProjects.find((a) => a.id === proj.id);
                const currentUrl = ap?.thumbnailUrl
                  ?? cloudinaryImage(PUBLIC_IDS.project(proj.id), { width: 640, transforms: 'c_fill,ar_16:9' });

                return (
                  <UploadSlot
                    key={proj.id}
                    label={proj.title}
                    hint={`ID: ${proj.id}`}
                    currentUrl={currentUrl}
                    slot={{ type: 'project', id: proj.id }}
                    accept="image/*"
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
