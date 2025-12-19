import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Browser / public client (RLS enforced)
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Server-only privileged client (bypasses RLS)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!anonKey) {
  console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
}

if (!serviceRoleKey) {
  console.warn("SUPABASE_SERVICE_ROLE_KEY is not set");
}

/**
 * Use this ONLY in client components / browser
 */
export const supabaseBrowser = createClient(
  supabaseUrl,
  anonKey as string
);

/**
 * Use this ONLY in server code (API routes, server actions)
 * This bypasses RLS and is required for storage uploads
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey as string
);

export const SUPABASE_BUCKET =
  process.env.SUPABASE_BUCKET || "gallery";
