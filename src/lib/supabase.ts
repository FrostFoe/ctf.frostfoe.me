import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Server-side client with service role key (for admin operations like creating sessions)
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceUrl || !supabaseServiceKey) {
  console.warn(
    "SUPABASE_SERVICE_ROLE_KEY not set. Some admin operations may fail."
  );
}

export const supabaseAdmin =
  supabaseServiceUrl && supabaseServiceKey
    ? createClient(supabaseServiceUrl, supabaseServiceKey)
    : null;
