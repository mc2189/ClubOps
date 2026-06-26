import { demoProvider } from "@/data/providers/demoProvider";
// Future live provider placeholder — NOT IMPLEMENTED. Do not import liveProvider here.
// import { liveProvider } from "@/data/providers/liveProvider.stub";
import { isDemoMode } from "@/lib/providerMode";

/**
 * ClubOps data provider entry point.
 *
 * - Public demo (permanent): demoProvider — fake data from src/data/demo/
 * - Future live deployment: liveProvider — provisional target: Supabase (Auth + Postgres + RLS + Storage)
 *   on a private Vercel deployment only. See RECOMMENDED_LIVE_STACK.md and AUTH_IMPLEMENTATION_PLAN.md.
 *
 * UI pages must use dataProvider only — never import demo data files directly.
 *
 * @see PROVIDER_CONTRACTS.md
 * @see ARCHITECTURE.md
 */
function resolveProvider() {
  if (isDemoMode()) {
    return demoProvider;
  }
  // Future: return liveProvider when live mode is implemented and explicitly enabled.
  // Until then, never switch away from demo on the public deployment.
  return demoProvider;
}

export const dataProvider = resolveProvider();

/** Explicit export for documentation and future wiring — not used at runtime yet */
export { demoProvider } from "@/data/providers/demoProvider";
