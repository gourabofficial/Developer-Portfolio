/**
 * Reusable "upload slot" component — shows a current preview + file input.
 * Handles the full signed-upload flow and reports status.
 */
import { useState, useRef, type ChangeEvent } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import {
  getUploadSignature,
  uploadToCloudinary,
  type Slot,
} from '@/lib/adminApi';
import { bustCache } from '@/lib/cloudinary';

type Status = 'idle' | 'uploading' | 'success' | 'error';

type Props = {
  label: string;
  currentUrl: string;
  slot: Slot;
  accept?: string;
  /** optional description shown under the label */
  hint?: string;
};

export function UploadSlot({ label, currentUrl, slot, accept = 'image/*', hint }: Props) {
  const [status, setStatus]     = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const [message, setMessage]   = useState('');
  const [previewUrl, setPreviewUrl] = useState(currentUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus('uploading');
    setProgress(0);
    setMessage('');

    try {
      // 1. Get a server-generated signature (secret never leaves server)
      const sig = await getUploadSignature(slot);

      // 2. Upload directly to Cloudinary using that signature
      const result = await uploadToCloudinary(file, sig, setProgress);

      // 3. Bust the preview cache so the new image appears immediately
      setPreviewUrl(bustCache(result.secure_url));
      setStatus('success');
      setMessage('Uploaded successfully!');
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Upload failed');
    }

    // Reset file input so the same file can be re-selected if needed
    if (inputRef.current) inputRef.current.value = '';
  }

  const isUploading = status === 'uploading';

  return (
    <div className="upload-slot">
      <div className="upload-slot-header">
        <span className="upload-slot-label">{label}</span>
        {hint && <span className="upload-slot-hint">{hint}</span>}
      </div>

      {/* Preview */}
      {previewUrl && accept !== 'application/pdf' && (
        <div className="upload-preview-frame">
          <img
            src={previewUrl}
            alt={`Current ${label}`}
            className="upload-preview-img"
            key={previewUrl} /* remount on URL change to trigger fresh load */
          />
        </div>
      )}

      {/* PDF: show link instead of image */}
      {previewUrl && accept === 'application/pdf' && (
        <div className="upload-pdf-link">
          <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="admin-link">
            View current resume ↗
          </a>
        </div>
      )}

      {/* Progress bar */}
      {isUploading && (
        <div className="upload-progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="upload-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Status message */}
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

      {/* File input */}
      <label className={`upload-file-btn ${isUploading ? 'uploading' : ''}`}>
        {isUploading
          ? <><Loader2 size={14} className="admin-spinner" aria-hidden /> Uploading {progress}%</>
          : status === 'success'
            ? <><RefreshCw size={14} aria-hidden /> Replace</>
            : <><Upload size={14} aria-hidden /> Choose file</>
        }
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFile}
          disabled={isUploading}
          className="upload-file-input-hidden"
          aria-label={`Upload ${label}`}
        />
      </label>
    </div>
  );
}
