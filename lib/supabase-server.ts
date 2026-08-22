import { createClient } from "@supabase/supabase-js";

export function getSupabaseServer() {
  const supabaseUrl =
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabaseServiceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Falta SUPABASE_URL en el entorno de ejecución"
    );
  }

  if (!supabaseServiceRoleKey) {
    throw new Error(
      "Falta SUPABASE_SERVICE_ROLE_KEY en el entorno de ejecución"
    );
  }

  return createClient(
    supabaseUrl,
    supabaseServiceRoleKey
  );
}