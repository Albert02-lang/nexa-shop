"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Product,
  NewProduct,
} from "../types/product";

interface ProductStore {
  productsAdded: Product[];

  productStatus: Record<
    number,
    "Disponible" | "En trato" | "Vendido"
  >;

  loadProducts: () => Promise<void>;

  addProduct: (
    product: NewProduct
  ) => Promise<void>;

  updateProduct: (
    product: Product
  ) => Promise<void>;

  updateStatus: (
    id: number,
    status:
      | "Disponible"
      | "En trato"
      | "Vendido"
  ) => Promise<void>;

  deleteProduct: (
    id: number
  ) => Promise<void>;
}

function mapProduct(
  item: any
): Product {
  return {
    id: item.id,

    name:
      item.name ?? "",

    price:
      Number(item.price ?? 0),

    oldPrice:
      item.old_price ??
      item.oldPrice ??
      undefined,

    image:
      item.image ?? "",

    category:
      item.category ?? "",

    type:
      item.type ?? "",

    gender:
      item.gender ?? "",

    description:
      item.description ?? "",

    size:
      item.size ?? undefined,

    sizes:
      item.sizes ?? [],

    colors:
      Array.isArray(item.colors)
        ? item.colors
        : [],

    available:
      item.available ?? true,

    status:
      item.status ??
      "Disponible",

    tag:
      item.tag ?? undefined,

    stock:
      item.stock ?? undefined,
  };
}

async function apiRequest(
  method: string,
  body?: unknown
) {
  const response =
    await fetch(
      "/api/products",
      {
        method,

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          body !== undefined
            ? JSON.stringify(body)
            : undefined,

        cache: "no-store",
      }
    );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ??
        "Error en la API de productos"
    );
  }

  return data;
}

export const useProductStore =
  create<ProductStore>()(
    persist(
      (set) => ({
        productsAdded: [],

        productStatus: {},

        loadProducts:
          async () => {
            try {
              const data =
                await apiRequest(
                  "GET"
                );

              const products =
                (data ?? []).map(
                  mapProduct
                );

              set({
                productsAdded:
                  products,

                productStatus:
  products.reduce(
    (
      acc: Record<
        number,
        "Disponible" |
        "En trato" |
        "Vendido"
      >,
      product: Product
    ) => {
      acc[product.id] =
        product.status;

      return acc;
    },
    {} as Record<
      number,
      "Disponible" |
      "En trato" |
      "Vendido"
    >
  ),
              });
            } catch (error) {
              console.error(
                "Error cargando productos:",
                error
              );
            }
          },

        addProduct:
          async (
            product
          ) => {
            try {
              const data =
                await apiRequest(
                  "POST",
                  {
                    name:
                      product.name,

                    price:
                      product.price,

                    image:
                      product.image,

                    category:
                      product.category,

                    type:
                      product.type,

                    gender:
                      product.gender,

                    description:
                      product.description,

                    size:
                      product.size,

                    sizes:
                      product.sizes,

                    colors:
                      product.colors,

                    available:
                      product.available,

                    status:
                      product.status,

                    tag:
                      product.tag,

                    stock:
                      product.stock,
                  }
                );

              const newProduct =
                mapProduct(data);

              set((state) => ({
                productsAdded: [
                  newProduct,
                  ...state.productsAdded,
                ],

                productStatus: {
                  ...state.productStatus,

                  [newProduct.id]:
                    newProduct.status,
                },
              }));
            } catch (error) {
              console.error(
                "Error agregando producto:",
                error
              );

              throw error;
            }
          },

        updateProduct:
          async (
            product
          ) => {
            try {
              const data =
                await apiRequest(
                  "PUT",
                  {
                    id:
                      product.id,

                    name:
                      product.name,

                    price:
                      product.price,

                    image:
                      product.image,

                    category:
                      product.category,

                    type:
                      product.type,

                    gender:
                      product.gender,

                    description:
                      product.description,

                    size:
                      product.size,

                    sizes:
                      product.sizes,

                    colors:
                      product.colors,

                    available:
                      product.available,

                    status:
                      product.status,

                    tag:
                      product.tag,

                    stock:
                      product.stock,
                  }
                );

              const updatedProduct =
                mapProduct(data);

              set((state) => ({
                productsAdded:
                  state.productsAdded.map(
                    (item) =>
                      item.id ===
                      updatedProduct.id
                        ? updatedProduct
                        : item
                  ),

                productStatus: {
                  ...state.productStatus,

                  [updatedProduct.id]:
                    updatedProduct.status,
                },
              }));
            } catch (error) {
              console.error(
                "Error actualizando producto:",
                error
              );

              throw error;
            }
          },

        updateStatus:
          async (
            id,
            status
          ) => {
            try {
              const data =
                await apiRequest(
                  "PATCH",
                  {
                    id,
                    status,
                  }
                );

              const updatedProduct =
                mapProduct(data);

              set((state) => ({
                productsAdded:
                  state.productsAdded.map(
                    (product) =>
                      product.id === id
                        ? updatedProduct
                        : product
                  ),

                productStatus: {
                  ...state.productStatus,

                  [id]:
                    updatedProduct.status,
                },
              }));
            } catch (error) {
              console.error(
                "Error actualizando estado:",
                error
              );

              throw error;
            }
          },

        deleteProduct:
          async (
            id
          ) => {
            try {
              await apiRequest(
                "DELETE",
                {
                  id,
                }
              );

              set((state) => ({
                productsAdded:
                  state.productsAdded.filter(
                    (product) =>
                      product.id !== id
                  ),

                productStatus:
                  Object.fromEntries(
                    Object.entries(
                      state.productStatus
                    ).filter(
                      ([key]) =>
                        Number(key) !==
                        id
                    )
                  ),
              }));
            } catch (error) {
              console.error(
                "Error eliminando producto:",
                error
              );

              throw error;
            }
          },
      }),
      {
        name:
          "nexa-products-storage",
      }
    )
  );