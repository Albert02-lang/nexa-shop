"use client";

import { useState } from "react";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({
  onLogin,
}: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!password.trim()) {
      setMessage("⚠️ Escribe la contraseña.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "/api/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data?.error ??
            "Contraseña incorrecta."
        );

        return;
      }

      sessionStorage.setItem(
        "nexa-admin-auth",
        "true"
      );

      onLogin();
    } catch (error) {
      console.error(
        "Error iniciando sesión:",
        error
      );

      setMessage(
        "❌ No se pudo comprobar la contraseña."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-black">
            Nexa Shop
          </h1>

          <p className="mt-2 text-gray-600">
            Panel de Administración
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-bold text-black">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Escribe tu contraseña"
              autoComplete="current-password"
              className="w-full rounded-xl border p-3 text-black outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Comprobando..."
              : "Entrar al administrador"}
          </button>

          {message && (
            <p className="text-center font-bold text-red-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}