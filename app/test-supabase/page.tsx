"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase-client";

export default function TestSupabase() {
  const [result, setResult] = useState("Comprobando conexión...");

  useEffect(() => {
    async function testConnection() {
      try {
        if (!supabase) {
  setResult(
    "Falta configuración de Supabase"
  );
  return;
}
        const { data, error } = await supabase
          .from("products")
          .select("*");

        if (error) {
          console.error("Error Supabase:", error);

          setResult(
            "Error Supabase: " + error.message
          );

          return;
        }

        setResult(
          "Productos encontrados: " +
          (data?.length ?? 0)
        );

        console.log(
          "Productos encontrados:",
          data
        );
      } catch (error) {
        console.error(
          "Error conectando con Supabase:",
          error
        );

        setResult(
          "Error conectando con Supabase"
        );
      }
    }

    testConnection();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow">
        <h1 className="text-3xl font-black text-black">
          Prueba Supabase
        </h1>

        <p className="mt-5 text-lg text-gray-700">
          {result}
        </p>
      </div>
    </main>
  );
}