/**
 * Supabase scaffold only — not active in public demo.
 *
 * Public Vercel demo builds and runs without Supabase env vars.
 * Do not require these variables for npm run build.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";

/** True only when both public Supabase env vars are non-empty. */
export function isSupabaseConfigured(): boolean {
  return SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
}

/** Service role key — server-only; never pass to client bundles. */
export function isSupabaseServiceRoleConfigured(): boolean {
  return isSupabaseConfigured() && SUPABASE_SERVICE_ROLE_KEY.length > 0;
}

export function getSupabasePublicEnv(): { url: string; anonKey: string } | null {
  if (!isSupabaseConfigured()) return null;
  return { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY };
}

/** Warn if service role would be exposed — for future server-only usage. */
export function assertServiceRoleServerOnly(): void {
  if (typeof window !== "undefined") {
    throw new Error(
      "[Supabase] SUPABASE_SERVICE_ROLE_KEY must never be used in client code.",
    );
  }
}
