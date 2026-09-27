/**
 * /admin route — password-gated admin panel.
 * On mount, checks if an existing session cookie is valid (GET /api/admin/me).
 * If valid → show panel directly. If not → show login form.
 */
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { adminMe } from '@/lib/adminApi';
import { AdminLogin } from './AdminLogin';
import { AdminPanel } from './AdminPanel';
import './admin.css';

type AuthState = 'checking' | 'logged-in' | 'logged-out';

export function Admin() {
  const [auth, setAuth] = useState<AuthState>('checking');

  useEffect(() => {
    adminMe()
      .then(() => setAuth('logged-in'))
      .catch(() => setAuth('logged-out'));
  }, []);

  if (auth === 'checking') {
    return (
      <div className="admin-center-screen" aria-label="Checking session…">
        <Loader2 size={32} className="admin-spinner" />
      </div>
    );
  }

  if (auth === 'logged-out') {
    return <AdminLogin onSuccess={() => setAuth('logged-in')} />;
  }

  return <AdminPanel onLogout={() => setAuth('logged-out')} />;
}

export default Admin;
