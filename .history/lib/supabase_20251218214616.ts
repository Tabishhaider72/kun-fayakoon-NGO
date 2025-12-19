import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cembizjkvgnoagroiejf.supabase.co";

// Prefer the service role key for server-side operations (uploads/deletes).
// Support common env var names used in different setups.
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.warn("Supabase key is not set in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey as string);

export const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || "gallery";
