"use client";

import { useEffect } from "react";

import { useProductStore } from "../../lib/product-store";

export default function ProductSync() {
  const loadProducts =
    useProductStore(
      (state) => state.loadProducts
    );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        await loadProducts();
      } catch (error) {
        if (!mounted) return;

        console.error(
          "Error cargando productos:",
          error
        );
      }
    };

    load();

    const syncProducts = async () => {
      try {
        await loadProducts();
      } catch (error) {
        console.error(
          "Error sincronizando productos:",
          error
        );
      }
    };

    window.addEventListener(
      "product-status-change",
      syncProducts
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "product-status-change",
        syncProducts
      );
    };
  }, [loadProducts]);

  return null;
}