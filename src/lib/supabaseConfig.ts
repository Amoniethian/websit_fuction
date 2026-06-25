/**
 * Supabase connection config (project URL + anon key).
 *
 * The anon key is a public client key (safe to store client-side); Row Level
 * Security on the table is what protects each user's data. Kept in localStorage
 * per device, with VITE_SUPABASE_* env vars as a dev fallback.
 */

export type SupabaseConfig = { url: string; anonKey: string };

const KEY = "cihai-supabase";
type Listener = () => void;
const listeners = new Set<Listener>();

export function loadSupabaseConfig(): SupabaseConfig | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const c = JSON.parse(raw);
      if (c.url && c.anonKey) return { url: c.url, anonKey: c.anonKey };
    }
  } catch {
    /* ignore */
  }
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (url && anonKey) return { url, anonKey };
  return null;
}

export function saveSupabaseConfig(c: SupabaseConfig | null) {
  if (!c) localStorage.removeItem(KEY);
  else localStorage.setItem(KEY, JSON.stringify(c));
  listeners.forEach((l) => l());
}

export function subscribeSupabaseConfig(l: Listener): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
