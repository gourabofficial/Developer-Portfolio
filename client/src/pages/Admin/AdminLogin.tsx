import { useState, type FormEvent } from 'react';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { adminLogin } from '@/lib/adminApi';

type Props = { onSuccess: () => void };

export function AdminLogin({ onSuccess }: Props) {
  const [password, setPassword] = useState('');
  const [show, setShow]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminLogin(password);
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-bg">
      <form className="admin-login-card" onSubmit={handleSubmit} noValidate>
        <div className="admin-login-icon">
          <Lock size={28} />
        </div>
        <h1 className="admin-login-title">Admin Panel</h1>
        <p className="admin-login-sub">Portfolio asset management</p>

        <label className="admin-field-label" htmlFor="admin-password">
          Password
        </label>
        <div className="admin-password-row">
          <input
            id="admin-password"
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
            placeholder="Enter admin password"
            autoComplete="current-password"
            disabled={loading}
            required
          />
          <button
            type="button"
            className="admin-show-btn"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && <p className="admin-error" role="alert">{error}</p>}

        <button type="submit" className="admin-btn-primary" disabled={loading || !password}>
          {loading ? <Loader2 size={16} className="admin-spinner" /> : null}
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
