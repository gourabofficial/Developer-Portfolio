import { useState } from 'react';
import { LogOut, ImageIcon, FileText, LayoutGrid } from 'lucide-react';
import { adminLogout } from '@/lib/adminApi';
import { HeroTab }     from './tabs/HeroTab';
import { ResumeTab }   from './tabs/ResumeTab';
import { ProjectsTab } from './tabs/ProjectsTab';

type Tab = 'hero' | 'resume' | 'projects';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'hero',     label: 'Hero Photo',  icon: <ImageIcon size={15} /> },
  { id: 'resume',   label: 'Resume',      icon: <FileText  size={15} /> },
  { id: 'projects', label: 'Projects',    icon: <LayoutGrid size={15} /> },
];

type Props = { onLogout: () => void };

export function AdminPanel({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('projects');

  async function handleLogout() {
    try { await adminLogout(); } catch { /* ignore */ }
    onLogout();
  }

  return (
    <div className="ap-root">
      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <aside className="ap-sidebar">
        <div className="ap-sidebar-brand">
          <div className="ap-brand-dot" />
          <span className="ap-brand-name">GG.dev</span>
        </div>

        <nav className="ap-nav" aria-label="Admin navigation">
          <p className="ap-nav-label">Content</p>
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`ap-nav-item ${tab === t.id ? 'active' : ''}`}
              aria-current={tab === t.id ? 'page' : undefined}
            >
              <span className="ap-nav-icon" aria-hidden>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        <div className="ap-sidebar-footer">
          <button className="ap-logout" onClick={handleLogout} aria-label="Log out">
            <LogOut size={14} aria-hidden />
            Log out
          </button>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────────────── */}
      <main className="ap-main">
        {/* Mobile header */}
        <header className="ap-mobile-header">
          <div className="ap-mobile-tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`ap-mobile-tab ${tab === t.id ? 'active' : ''}`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
          <button className="ap-logout-mobile" onClick={handleLogout} aria-label="Log out">
            <LogOut size={14} />
          </button>
        </header>

        <div className="ap-content">
          {tab === 'hero'     && <HeroTab />}
          {tab === 'resume'   && <ResumeTab />}
          {tab === 'projects' && <ProjectsTab />}
        </div>
      </main>
    </div>
  );
}
