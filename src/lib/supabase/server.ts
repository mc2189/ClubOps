/**
 * Supabase server client — scaffold only, not active in public demo.
 *
 * Do not wire into demo routes or dataProvider yet.
 * Returns null when Supabase env vars are missing.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabasePublicEnv } from "@/lib/supabase/config";

export type SupabaseServerClient = ReturnType<typeof createServerClient>;

/**
 * Create server Supabase client for future private live routes only.
 * Not used by public demo. Returns null when env vars missing.
 */
export async function createServerSupabaseClient(): Promise<SupabaseServerClient | null> {
  const env = getSupabasePublicEnv();
  if (!env) return null;

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll can fail in Server Components — middleware handles refresh in future live mode
        }
      },
    },
  });
}
