import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { adminLogin } from '@/lib/adminApi';

type Props = { onSuccess: () => void };

export function AdminLogin({ onSuccess }: Props) {
  const [password, setPassword] = useState('');
  const [show,     setShow]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password) return;
    setError('');
    setLoading(true);
    try {
      await adminLogin(password);
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Incorrect password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="al-bg">
      {/* Decorative grid */}
      <div className="al-grid" aria-hidden="true" />

      <div className="al-card">
        {/* Brand mark */}
        <div className="al-brand">
          <div className="al-brand-dot" />
          <span className="al-brand-name">GG.dev</span>
        </div>

        {/* Heading */}
        <div className="al-heading">
          <h1 className="al-title">Welcome back</h1>
          <p className="al-sub">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="al-form">
          <div className="al-field">
            <label htmlFor="al-pw" className="al-label">Password</label>
            <div className="al-input-wrap">
              <input
                id="al-pw"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`al-input ${error ? 'al-input-err' : ''}`}
                placeholder="Enter your admin password"
                autoComplete="current-password"
                disabled={loading}
                required
                autoFocus
              />
              <button
                type="button"
                className="al-toggle"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {error && (
              <p className="al-error" role="alert">
                <span className="al-error-dot" aria-hidden />
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="al-submit"
            disabled={loading || !password}
          >
            {loading ? (
              <><Loader2 size={15} className="admin-spinner" aria-hidden /> Signing in…</>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <p className="al-footer">Portfolio admin · private access only</p>
      </div>
    </div>
  );
}
