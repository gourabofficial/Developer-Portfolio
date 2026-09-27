import { useState, useRef, type ChangeEvent } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { getUploadSignature, uploadToCloudinary } from '@/lib/adminApi';
import { cloudinaryImage, PUBLIC_IDS, bustCache } from '@/lib/cloudinary';

type Status = 'idle' | 'uploading' | 'success' | 'error';

export function HeroTab() {
  const initialUrl = cloudinaryImage(PUBLIC_IDS.hero, { width: 480, transforms: 'c_fill,g_face,ar_1:1' });
  const [previewUrl, setPreviewUrl] = useState(initialUrl);
  const [status,     setStatus]     = useState<Status>('idle');
  const [progress,   setProgress]   = useState(0);
  const [message,    setMessage]    = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus('uploading'); setProgress(0); setMessage('');
    try {
      const sig    = await getUploadSignature('hero');
      const result = await uploadToCloudinary(file, sig, setProgress);
      setPreviewUrl(bustCache(result.secure_url));
      setStatus('success');
      setMessage('Profile photo updated successfully!');
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Upload failed');
    }
    if (inputRef.current) inputRef.current.value = '';
  }

  const uploading = status === 'uploading';

  return (
    <div className="tab-section">
      <div className="tab-heading">
        <h2 className="tab-title">Hero Profile Photo</h2>
        <p className="tab-desc">
          Replaces <code className="tab-code">portfolio/hero-profile</code> on Cloudinary.
          The public site updates immediately — no redeployment needed.
        </p>
      </div>

      <div className="hero-tab-layout">
        {/* Preview */}
        <div className="hero-preview-frame">
          {previewUrl ? (
            <img key={previewUrl} src={previewUrl} alt="Current hero photo" className="hero-preview-img" />
          ) : (
            <div className="hero-preview-empty">No photo uploaded yet</div>
          )}
        </div>

        {/* Controls */}
        <div className="hero-controls">
          <p className="hero-hint">JPEG, PNG, or WebP — max 10 MB. Face-crop applied automatically.</p>

          {uploading && (
            <div className="upload-progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <div className="upload-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          )}

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

          <label className={`upload-file-btn ${uploading ? 'uploading' : ''}`}>
            {uploading
              ? <><Loader2 size={14} className="admin-spinner" aria-hidden /> Uploading {progress}%</>
              : status === 'success'
                ? <><RefreshCw size={14} aria-hidden /> Replace photo</>
                : <><Upload size={14} aria-hidden /> Upload new photo</>
            }
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              disabled={uploading}
              className="upload-file-input-hidden"
              aria-label="Upload hero photo"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
