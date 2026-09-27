import { useEffect, useState, type FormEvent } from 'react';
import { ExternalLink, Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { fetchResumeUrl, updateResumeUrl } from '@/lib/adminApi';

const DRIVE_RE = /^https:\/\/(drive|docs)\.google\.com\//i;

function validateDriveUrl(url: string): string {
  if (!url.trim()) return 'URL is required';
  if (!DRIVE_RE.test(url)) return 'Must be a Google Drive URL (drive.google.com or docs.google.com)';
  return '';
}

export function ResumeTab() {
  const [url,      setUrl]      = useState('');
  const [saved,    setSaved]    = useState('');   // last successfully saved URL
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [status,   setStatus]   = useState<'idle' | 'success' | 'error'>('idle');
  const [message,  setMessage]  = useState('');

  useEffect(() => {
    fetchResumeUrl()
      .then((r) => { setUrl(r.url); setSaved(r.url); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    const err = validateDriveUrl(url);
    if (err) { setStatus('error'); setMessage(err); return; }

    setSaving(true); setStatus('idle'); setMessage('');
    try {
      const r = await updateResumeUrl(url.trim());
      setSaved(r.url);
      setUrl(r.url);
      setStatus('success');
      setMessage('Resume link saved!');
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  const validationError = url ? validateDriveUrl(url) : '';
  const isDirty = url !== saved;

  return (
    <div className="tab-section">
      <div className="tab-heading">
        <h2 className="tab-title">Resume Link</h2>
        <p className="tab-desc">
          Paste your Google Drive share link here. The public site's "My Resume" button points to this URL.
          No file upload needed — just update the link whenever you refresh your resume on Drive.
        </p>
      </div>

      {loading ? (
        <div className="admin-loading">
          <Loader2 size={18} className="admin-spinner" />
          Loading current link…
        </div>
      ) : (
        <form onSubmit={handleSave} noValidate className="resume-form">
          <div className="resume-field">
            <label htmlFor="resume-url" className="admin-field-label">Google Drive URL</label>
            <div className="resume-input-row">
              <input
                id="resume-url"
                type="url"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setStatus('idle'); }}
                className={`admin-input resume-input ${validationError && url ? 'admin-input-err' : ''}`}
                placeholder="https://drive.google.com/file/d/…/view"
                disabled={saving}
                autoComplete="off"
                spellCheck="false"
              />
              {saved && (
                <a
                  href={saved}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-preview-btn"
                  title="Open current resume in new tab"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
            {validationError && url && (
              <p className="resume-validation-hint">{validationError}</p>
            )}
          </div>

          {status === 'success' && (
            <p className="upload-status success" role="status">
              <CheckCircle size={14} aria-hidden /> {message}
            </p>
          )}
          {status === 'error' && (
            <p className="upload-status error" role="alert">
              <AlertCircle size={14} aria-hidden /> {message}
            </p>
          )}

          <button
            type="submit"
            className="admin-btn-primary resume-save-btn"
            disabled={saving || !isDirty || !!validationError}
          >
            {saving
              ? <><Loader2 size={14} className="admin-spinner" aria-hidden /> Saving…</>
              : <><Save size={14} aria-hidden /> Save link</>
            }
          </button>
        </form>
      )}
    </div>
  );
}
