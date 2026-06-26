/**
 * Supabase browser client — scaffold only, not active in public demo.
 *
 * Do not import this from demo pages or provider code yet.
 * Returns null when Supabase env vars are missing (public demo default).
 */

import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import { getSupabasePublicEnv, isSupabaseConfigured } from "@/lib/supabase/config";

export type SupabaseBrowserClient = ReturnType<typeof createSupabaseBrowserClient>;

/**
 * Create browser Supabase client, or null if not configured.
 * Safe for public demo — no throw when env vars absent.
 */
export function createBrowserClient(): SupabaseBrowserClient | null {
  const env = getSupabasePublicEnv();
  if (!env) return null;
  return createSupabaseBrowserClient(env.url, env.anonKey);
}

/** Whether browser client could be created (private live dev only). */
export { isSupabaseConfigured };
