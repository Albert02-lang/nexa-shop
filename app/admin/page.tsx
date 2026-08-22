"use client";

import {
  useEffect,
  useState,
} from "react";

import type { Product } from "../../types/product";

import { useProductStore } from "../../lib/product-store";

import AddProductForm from "../components/AddProductForm";
import AdminDashboard from "../components/AdminDashboard";
import EditProductModal from "../components/EditProductModal";
import AdminProductCard from "../components/AdminProductCard";
import AdminLogin from "./AdminLogin";

export default function AdminPage() {
  const [authenticated, setAuthenticated] =
    useState(false);

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("Todos");

  const [filterType, setFilterType] =
    useState("Todos");

  const [sortBy, setSortBy] =
    useState("recientes");

  /* =========================================================
     AUTENTICACIÓN
  ========================================================= */

  useEffect(() => {
    const auth =
      sessionStorage.getItem(
        "nexa-admin-auth"
      );

    if (auth === "true") {
      setAuthenticated(true);
    }

    setCheckingAuth(false);
  }, []);

  /* =========================================================
     TEMA
  ========================================================= */

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("nexa-theme");

    const isDark =
      savedTheme === "dark" ||
      document.documentElement.classList.contains(
        "dark"
      );

    setDarkMode(isDark);

    document.documentElement.classList.toggle(
      "dark",
      isDark
    );
  }, []);

  const toggleTheme = () => {
    const nextTheme = !darkMode;

    setDarkMode(nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme
    );

    localStorage.setItem(
      "nexa-theme",
      nextTheme ? "dark" : "light"
    );
  };

  /* =========================================================
     PRODUCTOS
  ========================================================= */

  const productsAdded =
    useProductStore(
      (state) => state.productsAdded
    );

  const updateStatus =
    useProductStore(
      (state) => state.updateStatus
    );

  const deleteProduct =
    useProductStore(
      (state) => state.deleteProduct
    );

  const allProducts =
    productsAdded;

  const filteredProducts =
    allProducts.filter(
      (product) => {
        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesStatus =
          filterStatus === "Todos" ||
          product.status ===
            filterStatus;

        const matchesType =
          filterType === "Todos" ||
          product.type?.trim() ===
            filterType;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesType
        );
      }
    );

  const sortedProducts =
    [...filteredProducts].sort(
      (a, b) => {
        if (
          sortBy === "nombre"
        ) {
          return a.name.localeCompare(
            b.name
          );
        }

        if (
          sortBy === "precio-menor"
        ) {
          return a.price - b.price;
        }

        if (
          sortBy === "precio-mayor"
        ) {
          return b.price - a.price;
        }

        return (
          (b.id ?? 0) -
          (a.id ?? 0)
        );
      }
    );

  const totalProducts =
    allProducts.length;

  const availableProducts =
    allProducts.filter(
      (product) =>
        product.status ===
        "Disponible"
    ).length;

  const pendingProducts =
    allProducts.filter(
      (product) =>
        product.status ===
        "En trato"
    ).length;

  const soldProducts =
    allProducts.filter(
      (product) =>
        product.status ===
        "Vendido"
    ).length;

  /* =========================================================
     ESTADOS DE CARGA / ACCESO
  ========================================================= */

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 transition-colors duration-300 dark:bg-slate-950">
        <p className="font-bold text-gray-600 dark:text-slate-300">
          Verificando acceso...
        </p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <AdminLogin
        onLogin={() =>
          setAuthenticated(true)
        }
      />
    );
  }

  /* =========================================================
     PANEL
  ========================================================= */

  return (
    <main className="min-h-screen bg-gray-100 py-20 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* =====================================================
            ENCABEZADO
        ===================================================== */}

        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Nexa Shop
            </p>

            <h1 className="text-4xl font-black text-black dark:text-white">
              Panel de Administración
            </h1>
          </div>

          {/* ===================================================
              BOTÓN DE TEMA
          =================================================== */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
            className="flex w-fit items-center gap-3 rounded-full border border-slate-900/10 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-xl transition hover:border-blue-500 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80"
          >
            <span className="theme-toggle-track">
              <span
                className={`theme-toggle-thumb ${
                  darkMode
                    ? "theme-toggle-thumb-dark"
                    : ""
                }`}
              >
                {darkMode ? "☀" : "☾"}
              </span>
            </span>

            <span className="whitespace-nowrap text-sm font-semibold text-slate-700 dark:text-slate-300">
              {darkMode
                ? "Modo claro"
                : "Modo oscuro"}
            </span>
          </button>
        </div>

        {/* =====================================================
            DASHBOARD
        ===================================================== */}

        <AdminDashboard
          total={totalProducts}
          available={availableProducts}
          pending={pendingProducts}
          sold={soldProducts}
        />

        {/* =====================================================
            AGREGAR PRODUCTO
        ===================================================== */}

        <AddProductForm />

        {/* =====================================================
            FILTROS
        ===================================================== */}

        <div className="mb-10 grid gap-4 md:grid-cols-2">

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="🔎 Buscar producto..."
            className="rounded-xl border border-slate-300 bg-white p-3 text-black outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-300 bg-white p-3 text-black outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="Todos">
              Todos los estados
            </option>

            <option value="Disponible">
              Disponible
            </option>

            <option value="En trato">
              En trato
            </option>

            <option value="Vendido">
              Vendido
            </option>
          </select>

          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-300 bg-white p-3 text-black outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="Todos">
              Todos los tipos
            </option>

            <option value="Playera">
              Playera
            </option>

            <option value="Sudadera">
              Sudadera
            </option>

            <option value="Jeans">
              Jeans
            </option>

            <option value="Chamarra">
              Chamarra
            </option>

            <option value="Calzado">
              Calzado
            </option>

            <option value="Accesorio">
              Accesorio
            </option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-300 bg-white p-3 text-black outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="recientes">
              Más recientes
            </option>

            <option value="nombre">
              Nombre A-Z
            </option>

            <option value="precio-menor">
              Precio menor
            </option>

            <option value="precio-mayor">
              Precio mayor
            </option>
          </select>

        </div>

        {/* =====================================================
            DESCRIPCIÓN
        ===================================================== */}

        <p className="mb-10 text-gray-600 dark:text-slate-400">
          Gestiona la disponibilidad de tus productos Nexa Shop.
        </p>

        {/* =====================================================
            PRODUCTOS
        ===================================================== */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {sortedProducts.map(
            (product) => (
              <AdminProductCard
                key={product.id}
                product={product}
                onStatusChange={
                  updateStatus
                }
                onEdit={
                  setSelectedProduct
                }
                onDelete={
                  async (id) => {
                    const confirmDelete =
                      confirm(
                        "¿Eliminar este producto?"
                      );

                    if (
                      confirmDelete
                    ) {
                      await deleteProduct(
                        id
                      );
                    }
                  }
                }
              />
            )
          )}

        </div>

        {/* =====================================================
            MODAL DE EDICIÓN
        ===================================================== */}

        <EditProductModal
          product={selectedProduct}
          onClose={() =>
            setSelectedProduct(null)
          }
        />

      </div>
    </main>
  );
}