"use client";

import Image from "next/image";

import AddToCartButton from "./AddToCartButton";
import ProductStatus from "./ProductStatus";

import { useProductStore } from "../../lib/product-store";
import type { Product } from "../../data/products";


interface ProductDetailsProps {
  product: Product;
}


export default function ProductDetails({
  product,
}: ProductDetailsProps) {


  const productStatus = useProductStore(
    (state) => state.productStatus
  );


  const currentStatus =
    productStatus[product.id] || product.status;



  const whatsappNumber = "525535059049";



  return (

    <main className="min-h-screen bg-gray-50 py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-10 lg:grid-cols-2">


          {/* Imagen */}

          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">


            <div className="relative h-[550px]">

              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition duration-500 hover:scale-105"
              />

            </div>



            {product.tag && (

              <span className="absolute left-6 top-6 rounded-full bg-black px-5 py-2 text-sm font-bold text-white">
                {product.tag}
              </span>

            )}



            <div className="absolute right-6 top-6">

              <ProductStatus
                status={currentStatus}
              />

            </div>


          </div>





          {/* Información */}

          <div className="rounded-3xl bg-white p-8 shadow-xl">


            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              {product.gender} · {product.category}
            </p>


            <h1 className="mt-3 text-4xl font-black text-black md:text-5xl">
              {product.name}
            </h1>



            <p className="mt-6 text-4xl font-black text-black">
              ${product.price}

              <span className="ml-2 text-lg font-medium text-gray-500">
                MXN
              </span>

            </p>





            <div className="mt-6 rounded-2xl bg-blue-50 p-5">

              <p className="font-bold text-black">

                {currentStatus === "Disponible" &&
                  "⭐ Pieza única disponible"}

                {currentStatus === "En trato" &&
                  "🟡 Producto en proceso de reserva"}

                {currentStatus === "Vendido" &&
                  "🔴 Producto vendido"}

              </p>

            </div>





            <p className="mt-6 leading-7 text-gray-700">
              {product.description}
            </p>





            <div className="mt-10 space-y-4">


              {currentStatus === "Disponible" && (

                <AddToCartButton product={product} />

              )}



              <a
                href={`https://wa.me/${whatsappNumber}?text=Hola Nexa Shop, quiero solicitar información sobre ${product.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-black py-4 text-center font-bold text-white transition hover:bg-green-600"
              >
                💬 Consultar por WhatsApp
              </a>


            </div>



          </div>


        </div>


      </div>


    </main>

  );

}