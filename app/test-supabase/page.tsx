"use client";

import { useEffect, useState } from "react";

export default function TestSupabase() {
  const [result, setResult] = useState(
    "Comprobando conexión..."
  );

  useEffect(() => {
    async function testConnection() {
      try {
        const response = await fetch(
          "/api/products",
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setResult(
            "Error Supabase: " +
              (data?.error ?? "Error desconocido")
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
          "Error conectando con la API:",
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