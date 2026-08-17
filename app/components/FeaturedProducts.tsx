"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import type { Product } from "../../types/product";

import { useCartStore } from "../../lib/cart-store";

import { useProductStore } from "../../lib/product-store";

import ProductSearch from "./ProductSearch";

import ProductFilters from "./ProductFilters";

import FavoriteButton from "./FavoriteButton";

export default function FeaturedProducts() {
  const whatsappNumber =
    "525535059049";

  const addItem =
    useCartStore(
      (state) => state.addItem
    );

  const cartItems =
    useCartStore(
      (state) => state.items
    );

  const productsAdded =
    useProductStore(
      (state) => state.productsAdded
    );

  const updateStatus =
    useProductStore(
      (state) => state.updateStatus
    );

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("Todos");

  const [sort, setSort] =
    useState("default");

  const isInCart = (id: number) => {
    return cartItems.some(
      (item) => item.id === id
    );
  };

  const filteredProducts =
    useMemo<Product[]>(() => {
      let list = [
        ...productsAdded,
      ];

      if (category !== "Todos") {
        list = list.filter(
          (product) =>
            product.category ===
            category
        );
      }

      if (search.trim() !== "") {
        const text =
          search.toLowerCase();

        list = list.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(text) ||
            product.category
              .toLowerCase()
              .includes(text) ||
            product.description
              .toLowerCase()
              .includes(text)
        );
      }

      switch (sort) {
        case "price-asc":
          list.sort(
            (a, b) =>
              a.price - b.price
          );
          break;

        case "price-desc":
          list.sort(
            (a, b) =>
              b.price - a.price
          );
          break;

        case "name":
          list.sort(
            (a, b) =>
              a.name.localeCompare(
                b.name
              )
          );
          break;
      }

      return list;
    }, [
      productsAdded,
      category,
      search,
      sort,
    ]);

  return (
    <section
      id="productos"
      className="bg-gray-50 py-16"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black text-black">
            Productos Destacados
          </h2>

          <p className="mt-3 text-gray-600">
            Encuentra prendas seleccionadas
            para tu estilo.
          </p>
        </div>

        <div className="space-y-6">
          <ProductSearch
            search={search}
            setSearch={setSearch}
          />

          <ProductFilters
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map(
            (product) => {
              const status =
                product.status ??
                "Disponible";

              const reserved =
                product.id !==
                  undefined &&
                isInCart(product.id);

              const handleReserve =
                async () => {
                  if (
                    product.id ===
                      undefined ||
                    reserved ||
                    status !==
                      "Disponible"
                  ) {
                    return;
                  }

                  addItem(product);

                  await updateStatus(
                    product.id,
                    "En trato"
                  );
                };

              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-md"
                >
                  <Link
                    href={`/products/${product.id}`}
                  >
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={
                          product.image ||
                          "/images/products/default.jpg"
                        }
                        alt={product.name}
                        fill
                        sizes="(max-width:768px)100vw,25vw"
                        className="object-cover"
                      />

                      <div className="absolute left-3 top-3">
                        <FavoriteButton
                          product={product}
                        />
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-sm font-bold text-blue-600">
                        {product.category}
                      </p>

                      <h3 className="text-xl font-black text-black">
                        {product.name}
                      </h3>

                      {/* PRECIO */}
                      <p className="mt-3 text-2xl font-black text-red-600">
                        ${product.price} MXN
                      </p>
                    </div>
                  </Link>

                  <div className="space-y-3 p-5">
                    <button
                      onClick={
                        handleReserve
                      }
                      disabled={
                        reserved ||
                        status !==
                          "Disponible"
                      }
                      className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
                    >
                      {status ===
                      "En trato"
                        ? "🟡 Producto en trato"
                        : status ===
                          "Vendido"
                        ? "🔴 Producto vendido"
                        : reserved
                        ? "✅ Producto en carrito"
                        : "🛒 Agregar al carrito"}
                    </button>

                    {/* WHATSAPP */}
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=Hola Nexa Shop, me interesa ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-bold text-white transition hover:bg-green-600"
                    >
                      {/* Logo de WhatsApp */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                        aria-hidden="true"
                      >
                        <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.5 0 .17 5.32.17 11.87c0 2.09.55 4.13 1.59 5.93L.07 24l6.34-1.66a11.85 11.85 0 0 0 5.63 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.41-8.41ZM12.05 21.77h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.76.98 1-3.67-.23-.38a9.85 9.85 0 0 1-1.51-5.25C2.16 6.43 6.6 1.99 12.05 1.99c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.88-9.89 9.88Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                      </svg>

                      <span>
                        WhatsApp
                      </span>
                    </a>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}