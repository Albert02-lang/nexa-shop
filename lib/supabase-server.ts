import { createClient } from "@supabase/supabase-js";

export function getSupabaseServer() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Falta NEXT_PUBLIC_SUPABASE_URL en el entorno de ejecución"
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      "Falta NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno de ejecución"
    );
  }

  return createClient(
    supabaseUrl,
    supabaseAnonKey
  );
}