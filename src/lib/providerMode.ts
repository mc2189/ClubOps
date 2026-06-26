/**
 * Provider mode — demo is permanent for the public deployment.
 * Live mode is a separate future deployment; never auto-switch without explicit config.
 *
 * v1.4.0: CLUBOPS_PROVIDER_MODE env documented in .env.example but runtime stays demo
 * until liveProvider + auth + RLS are implemented on a private deployment.
 */

export type ProviderMode = "demo" | "live";

/** Provisional live stack (not implemented): Supabase Auth + Postgres + RLS + Storage. */
export const PROVISIONAL_LIVE_STACK = "supabase" as const;

/**
 * Active provider mode for this build.
 * Public Vercel demo MUST remain "demo" — do not change without private deploy + security review.
 */
export const PROVIDER_MODE: ProviderMode = "demo";

/** Documented env var — not used to switch provider in v1.4.0 (safety). */
export const PROVIDER_MODE_ENV_KEY = "CLUBOPS_PROVIDER_MODE";

export const isDemoMode = (): boolean => PROVIDER_MODE === "demo";

/**
 * Future: true only when CLUBOPS_PROVIDER_MODE=live AND all Supabase env vars set AND liveProvider wired.
 * Always false in v1.4.0 — public demo safety.
 */
export function wouldAllowLiveProvider(): boolean {
  if (PROVIDER_MODE !== "demo") return false;
  // v1.4.0: never allow live provider at runtime regardless of env
  return false;
}

/** Required env vars before liveProvider could ever be enabled (future). */
export const LIVE_PROVIDER_REQUIRED_ENV = [
  "CLUBOPS_PROVIDER_MODE",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

export function isLiveProviderEnvReady(): boolean {
  const mode = process.env.CLUBOPS_PROVIDER_MODE?.trim();
  if (mode !== "live") return false;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return Boolean(url && anon && service);
}

/** Human-readable label for settings UI */
export const providerModeLabel =
  PROVIDER_MODE === "demo"
    ? "Demo mode — fake data only (permanent for public demo)"
    : "Live mode — real data (private deployment only)";

export const providerSafetyNotes = [
  "Public demo must never use liveProvider",
  "liveProvider only on private deployment with real auth + RLS first",
  "No liveProvider without all required Supabase env vars",
  "Service role key server-side only — never in client bundle",
  "Supabase scaffold exists but is not wired to demo routes",
] as const;
