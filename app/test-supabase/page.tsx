"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "../../lib/supabase-client";

export default function TestSupabase() {
  const [result, setResult] = useState(
    "Conectando con Supabase..."
  );

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase =
          getSupabaseClient();

        setResult(
          "Cliente Supabase creado. Consultando productos..."
        );

        const timeout = new Promise<never>(
          (_, reject) =>
            setTimeout(
              () =>
                reject(
                  new Error(
                    "La consulta a Supabase tardó más de 10 segundos."
                  )
                ),
              10000
            )
        );

        const query =
          supabase
            .from("products")
            .select("*");

        const { data, error } =
          await Promise.race([
            query,
            timeout,
          ]);

        if (error) {
          setResult(
            `Error Supabase: ${error.message}`
          );
          console.error(
            "Error Supabase:",
            error
          );
          return;
        }

        setResult(
          `Productos encontrados: ${
            data?.length ?? 0
          }`
        );

        console.log(
          "Productos:",
          data
        );
      } catch (error) {
        console.error(
          "Error de conexión:",
          error
        );

        setResult(
          error instanceof Error
            ? error.message
            : "Error desconocido"
        );
      }
    }

    testConnection();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Prueba Supabase
      </h1>

      <p className="mt-5">
        {result}
      </p>
    </main>
  );
}