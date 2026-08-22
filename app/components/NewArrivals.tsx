"use client";
import Image from "next/image";
import Link from "next/link";

import { useProductStore } from "../../lib/product-store";


export default function NewArrivals() {

  const productsAdded = useProductStore(
    (state) => state.productsAdded
  );

const newProducts = productsAdded.slice(0,4);

  return (

    <section className="bg-transparent py-20">


      <div className="mx-auto max-w-7xl px-6">





        <div className="mb-12 text-center">


          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Nueva temporada
          </p>



          <h2 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
  🆕 Novedades 2026
</h2>



          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
  Descubre las últimas prendas agregadas a Nexa Shop.
</p>


        </div>







        {newProducts.length === 0 ? (


          <div className="rounded-3xl bg-gray-50 p-10 text-center shadow-sm">

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Próximamente nuevas prendas
            </h3>

            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Estamos preparando nuevos productos para ti.
            </p>

          </div>



        ) : (




          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">





            {newProducts.map((product) => {

  if(product.id === undefined){
    return null;
  }

  return (




              <div

                key={product.id}

                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  bg-gray-50
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-3
                  hover:bg-white
                  hover:shadow-2xl
                "

              >





                <Link href={`/products/${product.id}`}>




                  <div className="relative h-72 overflow-hidden">



                    <Image

  src={
    product.image &&
    product.image.trim() !== ""
      ? product.image
      : "/images/products/default.jpg"
  }

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
                        bg-blue-600
                        px-4
                        py-2
                        text-xs
                        font-bold
                        text-white
                      "
                    >

                      🆕 Nuevo

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





                        );

          })}





          </div>




        )}





      </div>



    </section>


  );

}