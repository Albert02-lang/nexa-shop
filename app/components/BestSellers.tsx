"use client";

import Link from "next/link";
import Image from "next/image";

import { useEffect } from "react";
import { useProductStore } from "../../lib/product-store";


export default function BestSellers() {

const productsAdded = useProductStore(
  (state) => state.productsAdded
);


const loadProducts = useProductStore(
  (state) => state.loadProducts
);


useEffect(() => {

  loadProducts();

}, [loadProducts]);


const bestProducts = productsAdded.slice(0, 4);
  return (

    <section className="bg-gray-50 py-20">


      <div className="mx-auto max-w-7xl px-6">





        <div className="mb-12 text-center">


          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">

            Favoritos de nuestros clientes

          </p>



          <h2 className="mt-3 text-4xl font-black text-black">

            🏆 Productos más vendidos

          </h2>



          <p className="mx-auto mt-4 max-w-2xl text-gray-600">

            Conoce las prendas que más destacan por su estilo,
            comodidad y popularidad.

          </p>


        </div>








        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">





          {bestProducts.map((product) => (




            <div

              key={product.id}

              className="
                group
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-sm
                transition
                duration-300
                hover:-translate-y-3
                hover:shadow-2xl
              "

            >




              <Link href={`/products/${product.id}`}>




                <div className="relative h-64 overflow-hidden">



                  <Image

                    src={product.image}

                    alt={product.name}

                    fill

                    className="
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-110
                    "

                  />





                  <span
                    className="
                      absolute
                      left-4
                      top-4
                      rounded-full
                      bg-black
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-white
                    "
                  >

                    🔥 Más vendido

                  </span>




                </div>






                <div className="p-6">





                  <p className="text-sm font-bold uppercase tracking-wide text-blue-600">

                    {product.category}

                  </p>





                  <h3 className="mt-2 text-xl font-black text-black">

                    {product.name}

                  </h3>






                  <p className="mt-3 line-clamp-2 text-sm text-gray-600">

                    {product.description}

                  </p>






                  <div className="mt-5 flex items-center justify-between">





                    <p className="text-2xl font-black text-black">

                      ${product.price}

                      <span className="ml-1 text-sm font-medium text-gray-500">

                        MXN

                      </span>

                    </p>






                    <span className="text-yellow-400">

                      ★★★★★

                    </span>





                  </div>





                </div>




              </Link>






              <Link

                href={`/products/${product.id}`}

                className="
                  mx-6
                  mb-6
                  block
                  rounded-xl
                  border
                  border-gray-300
                  py-3
                  text-center
                  font-semibold
                  text-black
                  transition
                  hover:border-blue-600
                  hover:bg-blue-50
                  hover:text-blue-600
                "

              >

                👁️ Ver producto

              </Link>





            </div>





          ))}





        </div>





      </div>



    </section>


  );

}