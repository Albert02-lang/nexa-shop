"use client";

import { useProductStore } from "../../lib/product-store";
import AddToCartButton from "./AddToCartButton";

import type { Product } from "../../data/products";

interface ProductPurchaseProps {
  product: Product;
}

export default function ProductPurchase({
  product,
}: ProductPurchaseProps) {

  const products = useProductStore(
    (state) => state.productsAdded
  );

  const currentProduct =
    products.find(
      (p) => p.id === product.id
    ) ?? product;

  const currentStatus =
    currentProduct.status;

  const whatsappNumber =
    "525535059049";

  if (currentStatus === "Vendido") {
    return (
      <div className="rounded-xl bg-red-100 p-5 text-center font-bold text-red-700">
        🔴 Producto vendido
      </div>
    );
  }

  if (currentStatus === "En trato") {
    return (
      <div className="rounded-xl bg-yellow-100 p-5 text-center font-bold text-yellow-700">
        🟡 Producto en trato.
        <br />
        Consulta disponibilidad.
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <AddToCartButton
        product={currentProduct}
      />

      <a
        href={`https://wa.me/${whatsappNumber}?text=Hola Nexa Shop, me interesa comprar ${currentProduct.name} con precio de $${currentProduct.price} MXN. ¿Está disponible?`}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl bg-green-600 py-4 text-center font-bold text-white transition hover:bg-green-700"
      >
        💬 Pedir por WhatsApp
      </a>

    </div>
  );
}