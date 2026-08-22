"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCartStore } from "../../lib/cart-store";
import { useFavoritesStore } from "../../lib/favorites-store";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const itemsCount = useCartStore((state) => state.items.length);

  const favoritesCount = useFavoritesStore(
    (state) => state.favorites.length
  );

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const nextTheme = !darkMode;

    setDarkMode(nextTheme);

    document.documentElement.classList.toggle("dark", nextTheme);

    localStorage.setItem(
      "nexa-theme",
      nextTheme ? "dark" : "light"
    );
  };

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Hombre", href: "/category/Hombre" },
    { name: "Mujer", href: "/category/Mujer" },
    { name: "Niños", href: "/category/Niños" },
    { name: "Catálogo", href: "/#productos" },
    { name: "Contacto", href: "/#contacto" },
  ];

  return (
    <header className="fixed left-0 top-0 z-[100] w-full border-b border-slate-900/10 bg-white/80 text-slate-900 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/80 dark:text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-3"
        >
          <Image
            src="/images/logo.png"
            width={200}
            height={80}
            className="h-10 w-auto shrink-0 object-contain"
            alt="Nexa Shop"
          />

          <div className="hidden sm:block">
            <h1 className="text-2xl font-black tracking-tight">
              Nexa
              <span className="text-blue-600 dark:text-blue-400">
                Shop
              </span>
            </h1>

            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Moda para todos
            </p>
          </div>
        </Link>

        {/* Navegación desktop */}
        <ul className="hidden items-center gap-6 text-base font-semibold lg:flex">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-slate-700 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Favoritos */}
          <li>
            <Link
              href="/favorites"
              className="relative text-xl transition hover:scale-110"
              aria-label="Favoritos"
            >
              ❤️

              {favoritesCount > 0 && (
                <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </li>

          {/* Reservas */}
          <li>
            <Link
              href="/cart"
              className="relative rounded-full bg-slate-950 px-6 py-3 text-white transition hover:bg-blue-600 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-400"
            >
              ⭐ Reservas

              {itemsCount > 0 && (
                <span className="absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {itemsCount}
                </span>
              )}
            </Link>
          </li>

          {/* Tema */}
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                darkMode
                  ? "Cambiar a modo claro"
                  : "Cambiar a modo oscuro"
              }
              className="flex items-center gap-2"
            >
              <span className="theme-toggle-track">
                <span
                  className={`theme-toggle-thumb ${
                    darkMode ? "theme-toggle-thumb-dark" : ""
                  }`}
                >
                  {darkMode ? "☀" : "☾"}
                </span>
              </span>

              <span className="whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-300">
                {darkMode ? "Modo claro" : "Modo oscuro"}
              </span>
            </button>
          </li>
        </ul>

        {/* Controles móviles */}
        <div className="flex items-center gap-2 lg:hidden">

          {/* Tema móvil */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
            className="theme-toggle"
          >
            <span className="theme-toggle-track">
              <span
                className={`theme-toggle-thumb ${
                  darkMode ? "theme-toggle-thumb-dark" : ""
                }`}
              >
                {darkMode ? "☀" : "☾"}
              </span>
            </span>
          </button>

          {/* Menú móvil */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/10 bg-white/60 text-2xl dark:border-white/10 dark:bg-white/5"
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-slate-900/10 bg-white/95 px-5 py-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 lg:hidden">
          <ul className="flex flex-col gap-4 font-semibold">

            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-slate-800 transition hover:bg-blue-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-blue-400"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Favoritos móvil */}
            <li>
              <Link
                href="/favorites"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-red-50 px-4 py-3 text-slate-900 dark:bg-red-500/10 dark:text-slate-100"
              >
                ❤️ Favoritos ({favoritesCount})
              </Link>
            </li>

            {/* Reservas móvil */}
            <li>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-slate-950 px-5 py-3 text-center text-white dark:bg-white dark:text-slate-950"
              >
                ⭐ Reservas ({itemsCount})
              </Link>
            </li>

          </ul>
        </div>
      )}
    </header>
  );
}