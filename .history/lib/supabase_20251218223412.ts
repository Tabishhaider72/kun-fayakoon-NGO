import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cembizjkvgnoagroiejf.supabase.co";

// Public (anon) key used in browser contexts
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Service role / server key used for server-side operations (bypasses RLS)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;

if (!anonKey && !serviceRoleKey) {
  console.warn("Supabase keys are not set in environment variables.");
}

// Export a default client intended for browser usage (anon key)
export const supabase = createClient(supabaseUrl, (anonKey || serviceRoleKey) as string);

// Export an admin client that uses the service role key when available. If
// the service role key is not present, fall back to the regular client.
export const supabaseAdmin = serviceRoleKey ? createClient(supabaseUrl, serviceRoleKey) : supabase;

export const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "gallery";
