import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Product } from "../data/products";

interface ProductStore {
  productStatus: Record<
    number,
    "Disponible" | "En trato" | "Vendido"
  >;

  productsAdded: Product[];

  updateStatus: (
    id: number,
    status: "Disponible" | "En trato" | "Vendido"
  ) => void;

  addProduct: (
    product: Product
  ) => void;

  updateProduct: (
    product: Product
  ) => void;

  deleteProduct: (
    id: number
  ) => void;

  syncStorage: () => void;
}

export const useProductStore =
  create<ProductStore>()(
    persist(
      (set) => ({
        productStatus: {},

        productsAdded: [],

        updateStatus: (id, status) => {
          set((state) => ({
            productStatus: {
              ...state.productStatus,
              [id]: status,
            },
          }));

          if (typeof window !== "undefined") {
            localStorage.setItem(
              "nexa-shop-refresh",
              Date.now().toString()
            );

            window.dispatchEvent(
              new Event("product-status-change")
            );
          }
        },

        addProduct: (product) => {
          set((state) => ({
            productsAdded: [
              ...state.productsAdded,
              product,
            ],
          }));

          if (typeof window !== "undefined") {
            localStorage.setItem(
              "nexa-shop-refresh",
              Date.now().toString()
            );

            window.dispatchEvent(
              new Event("product-status-change")
            );
          }
        },

        updateProduct: (product) => {
          set((state) => ({
            productsAdded:
              state.productsAdded.map((item) =>
                item.id === product.id
                  ? product
                  : item
              ),
          }));

          if (typeof window !== "undefined") {
            localStorage.setItem(
              "nexa-shop-refresh",
              Date.now().toString()
            );

            window.dispatchEvent(
              new Event("product-status-change")
            );
          }
        },

        deleteProduct: (id) => {
          set((state) => ({
            productsAdded:
              state.productsAdded.filter(
                (product) =>
                  product.id !== id
              ),
          }));

          if (typeof window !== "undefined") {
            localStorage.setItem(
              "nexa-shop-refresh",
              Date.now().toString()
            );

            window.dispatchEvent(
              new Event("product-status-change")
            );
          }
        },

        syncStorage: () => {
          if (typeof window === "undefined") {
            return;
          }

          const saved =
            localStorage.getItem(
              "nexa-shop-products"
            );

          if (saved) {
            try {
              const data =
                JSON.parse(saved);

              set({
                productStatus:
                  data.state?.productStatus ??
                  {},

                productsAdded:
                  data.state?.productsAdded ??
                  [],
              });
            } catch (error) {
              console.error(
                "Error sincronizando productos",
                error
              );
            }
          }
        },
      }),
      {
        name: "nexa-shop-products",

        onRehydrateStorage: () => {
          return () => {
            if (
              typeof window !== "undefined"
            ) {
              window.dispatchEvent(
                new Event(
                  "product-status-change"
                )
              );
            }
          };
        },
      }
    )
  );