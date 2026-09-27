import { useEffect, useState } from 'react';
import { fetchResumeUrl } from '@/lib/adminApi';

export function useResumeUrl() {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumeUrl()
      .then((r) => setUrl(r.url))
      .catch(() => setUrl(''))
      .finally(() => setLoading(false));
  }, []);

  return { url, loading };
}
