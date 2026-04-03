import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

let cache: Record<string, string> | null = null;
let fetchPromise: Promise<Record<string, string>> | null = null;

async function fetchSettings(): Promise<Record<string, string>> {
  const { data } = await supabase.from('site_settings').select('key, value');
  const map: Record<string, string> = {};
  (data || []).forEach((s) => { map[s.key] = s.value || ''; });
  cache = map;
  return map;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>(cache || {});
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) { setSettings(cache); setLoading(false); return; }
    if (!fetchPromise) fetchPromise = fetchSettings();
    fetchPromise.then((s) => { setSettings(s); setLoading(false); });
  }, []);

  return { settings, loading };
}

export function invalidateSiteSettingsCache() {
  cache = null;
  fetchPromise = null;
}
