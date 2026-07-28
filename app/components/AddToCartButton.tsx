"use client";

import { useState } from "react";

import { useCartStore } from "../../lib/cart-store";
import type { Product } from "../../data/products";


interface AddToCartButtonProps {
  product: Product;
}


export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {


  const addItem = useCartStore(
    (state) => state.addItem
  );


  const items = useCartStore(
    (state) => state.items
  );


  const [showMessage, setShowMessage] = useState(false);



  const isInCart = items.some(
    (item) => item.id === product.id
  );



  const handleAddToCart = () => {

    if (isInCart || product.status !== "Disponible") {
      return;
    }


    addItem(product);


    setShowMessage(true);


    setTimeout(() => {
      setShowMessage(false);
    }, 2000);

  };



  if (product.status !== "Disponible") {

    return (

      <button
        disabled
        className={`mt-6 w-full rounded-xl py-4 font-bold text-white ${
          product.status === "En trato"
            ? "bg-yellow-500"
            : "bg-red-600"
        }`}
      >

        {product.status === "En trato"
          ? "🟡 Producto en trato"
          : "🔴 Producto vendido"}

      </button>

    );

  }



  return (

    <>

      <button
        onClick={handleAddToCart}
        disabled={isInCart}
        className={`mt-6 w-full rounded-xl py-4 font-bold text-white transition ${
          isInCart
            ? "cursor-not-allowed bg-green-600"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >

        {isInCart
          ? "✅ Pieza reservada en carrito"
          : "⭐ Reservar esta pieza"}

      </button>



      {showMessage && (

        <div className="mt-4 rounded-xl border border-green-200 bg-green-100 px-4 py-3 text-center font-medium text-green-700">

          ✅ {product.name} reservado correctamente

        </div>

      )}

    </>

  );

}