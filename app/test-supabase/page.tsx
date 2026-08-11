"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "../../lib/supabase-client";

export default function TestSupabase() {

  const [result, setResult] = useState("");

  useEffect(() => {

    async function testConnection() {

     const supabase =
  getSupabaseClient();
  
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        setResult(
          "Error: " + error.message
        );
        return;
      }

      setResult(
        "Productos encontrados: " +
        data.length
      );

      console.log("Productos:", data);

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