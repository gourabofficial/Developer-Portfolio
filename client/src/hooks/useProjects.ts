/**
 * Fetches the project list from the API.
 * Returns loading / error / data states for use in public-facing components.
 */
import { useEffect, useState } from 'react';
import { fetchProjects, type Project } from '@/lib/adminApi';

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; projects: Project[] };

export function useProjects(): State {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    fetchProjects()
      .then((r) => {
        if (!cancelled) setState({ status: 'ok', projects: r.projects });
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setState({
            status: 'error',
            message: err instanceof Error ? err.message : 'Failed to load projects',
          });
      });
    return () => { cancelled = true; };
  }, []);

  return state;
}
