/**
 * Supabase middleware helper — NOT WIRED in v1.4.0.
 *
 * Public demo has no middleware.ts and must not require login.
 *
 * When implementing private live mode (future iteration):
 * 1. Add src/middleware.ts at project root
 * 2. Call updateSession() only on private live deployment
 * 3. Never protect /demo, /dashboard, or public demo routes on the demo URL
 * 4. Scope auth redirects to /login on live deploy only
 *
 * @see PRIVATE_DEPLOYMENT_CHECKLIST.md
 * @see SUPABASE_LOCAL_DEV.md
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicEnv } from "@/lib/supabase/config";

/**
 * Refresh Supabase session — for future private live middleware only.
 * No-op passthrough when Supabase is not configured (public demo).
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  const env = getSupabasePublicEnv();
  if (!env) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  // Session refresh only — do not add route protection here until live mode is explicitly enabled
  await supabase.auth.getUser();

  return supabaseResponse;
}
