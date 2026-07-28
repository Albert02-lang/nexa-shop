"use client";

import Image from "next/image";
import Link from "next/link";

import { useFavoritesStore } from "../../lib/favorites-store";
import { useCartStore } from "../../lib/cart-store";

export default function FavoritesPage() {


  const favorites = useFavoritesStore(
    (state) => state.favorites
  );


  const removeFavorite = useFavoritesStore(
    (state) => state.removeFavorite
  );


  const addItem = useCartStore(
    (state) => state.addItem
  );
const cartItems = useCartStore(
  (state) => state.items
);


  return (

    <main className="min-h-screen bg-gray-50 py-28">


      <div className="mx-auto max-w-7xl px-4 sm:px-6">



        <div className="mb-10">

          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Nexa Shop
          </p>


          <h1 className="mt-2 text-4xl font-black text-black">
            ❤️ Mis favoritos
          </h1>


          <p className="mt-3 text-gray-600">
            Tus prendas guardadas para comprar cuando quieras.
          </p>


        </div>





        {favorites.length === 0 ? (


          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">


            <div className="text-5xl">
              ❤️
            </div>


            <h2 className="mt-5 text-2xl font-bold text-black">
              No tienes productos favoritos
            </h2>


            <p className="mt-3 text-gray-600">
              Guarda tus productos favoritos y aparecerán aquí.
            </p>



            <Link
              href="/#productos"
              className="mt-6 inline-block rounded-full bg-black px-8 py-3 font-bold text-white transition hover:bg-blue-600"
            >
              Explorar productos
            </Link>


          </div>



        ) : (



          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">



            {favorites.map((product) => (



              <div
                key={product.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >



                <Link href={`/products/${product.id}`}>


                  <div className="relative aspect-[4/5] overflow-hidden">


                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />


                    {product.tag && (

                      <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                        {product.tag}
                      </span>

                    )}


                  </div>





                  <div className="p-5">


                    <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                      {product.category}
                    </p>


                    <h2 className="mt-2 text-xl font-black text-black">
                      {product.name}
                    </h2>


                    <div className="mt-3 text-yellow-400">
                      ★★★★★
                    </div>



                    <div className="mt-3">


                      {product.oldPrice && (

                        <p className="text-sm text-gray-400 line-through">
                          ${product.oldPrice} MXN
                        </p>

                      )}



                      <p className="text-2xl font-black text-black">
                        ${product.price}

                        <span className="ml-1 text-sm font-medium text-gray-500">
                          MXN
                        </span>

                      </p>


                    </div>




                    <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>



                  </div>



                </Link>



                <div className="space-y-3 border-t border-gray-100 px-5 py-5">


                  <button
  onClick={() => addItem(product)}
  disabled={cartItems.some(
    (item) => item.id === product.id
  )}
  className={`w-full rounded-2xl py-3 font-bold text-white transition ${
    cartItems.some(
      (item) => item.id === product.id
    )
      ? "cursor-not-allowed bg-green-600"
      : "bg-blue-600 hover:scale-[1.02] hover:bg-blue-700"
  }`}
>
  {cartItems.some(
    (item) => item.id === product.id
  )
    ? "✅ Producto en carrito"
    : "🛒 Agregar al carrito"}
</button>


                  <button
                    onClick={() =>
                      removeFavorite(product.id)
                    }
                    className="w-full rounded-2xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700"
                  >
                    ❤️ Quitar favorito
                  </button>



                </div>



              </div>



            ))}



          </div>



        )}



      </div>



    </main>


  );


}