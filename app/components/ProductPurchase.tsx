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


  const productStatus = useProductStore(
    (state) => state.productStatus
  );


  const currentStatus =
    productStatus[product.id] ||
    product.status ||
    "Disponible";



  const whatsappNumber = "525535059049";



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


      <AddToCartButton product={product} />



      <a
        href={`https://wa.me/${whatsappNumber}?text=Hola Nexa Shop, me interesa reservar ${product.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl bg-black py-4 text-center font-bold text-white transition hover:bg-green-600"
      >
        ⭐ Reservar esta pieza por WhatsApp
      </a>


    </div>

  );

}