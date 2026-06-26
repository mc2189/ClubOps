/**
 * Provider mode — demo is permanent for the public deployment.
 * Live mode is a separate future deployment; never auto-switch without explicit config.
 */

export type ProviderMode = "demo" | "live";

/** Active provider mode. Public Vercel demo must remain "demo". */
export const PROVIDER_MODE: ProviderMode = "demo";

export const isDemoMode = (): boolean => PROVIDER_MODE === "demo";

/** Human-readable label for settings UI */
export const providerModeLabel =
  PROVIDER_MODE === "demo"
    ? "Demo mode — fake data only (permanent for public demo)"
    : "Live mode — real data (private deployment only)";
