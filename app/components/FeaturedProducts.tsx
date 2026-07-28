"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { products } from "../../data/products";
import { useCartStore } from "../../lib/cart-store";
import { useProductStore } from "../../lib/product-store";

import ProductSearch from "./ProductSearch";
import ProductFilters from "./ProductFilters";
import FavoriteButton from "./FavoriteButton";


export default function FeaturedProducts() {
  useEffect(() => {

  const refreshProducts = () => {
    window.dispatchEvent(
      new Event("product-status-change")
    );
  };


  window.addEventListener(
    "product-status-change",
    refreshProducts
  );


  window.addEventListener(
    "storage",
    refreshProducts
  );


  return () => {

    window.removeEventListener(
      "product-status-change",
      refreshProducts
    );


    window.removeEventListener(
      "storage",
      refreshProducts
    );

  };


}, []);


  const whatsappNumber = "525535059049";


  const addItem = useCartStore(
    (state) => state.addItem
  );


  const cartItems = useCartStore(
    (state) => state.items
  );


  const productStatus = useProductStore(
    (state) => state.productStatus
  );

  const updateStatus = useProductStore(
  (state) => state.updateStatus
);


  const productsAdded = useProductStore(
    (state) => state.productsAdded
  );



  const allProducts = [
  ...products,
  ...productsAdded,
].map((product) => ({

  ...product,

  status:
    productStatus[product.id] ||
    product.status ||
    "Disponible",

}));



  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("Todos");

  const [sort, setSort] = useState("default");



  const isInCart = (id: number) =>
    cartItems.some(
      (item) => item.id === id
    );



  const filteredProducts = useMemo(() => {


    let list = [...allProducts];



    if (category !== "Todos") {

      list = list.filter(
        (product) =>
          product.category === category
      );

    }



    if (search.trim() !== "") {


      const text = search.toLowerCase();



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



      default:

        break;


    }



    return list;


  }, [
    search,
    category,
    sort,
    productsAdded,
    productStatus
  ]);



  return (

    <section
      id="productos"
      className="bg-gray-50 py-16 md:py-20"
    >


      <div className="mx-auto max-w-7xl px-4 sm:px-6">



        <div className="mb-10 text-center">


          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Nuestra colección
          </p>



          <h2 className="mt-2 text-3xl font-black text-black md:text-4xl">
            Productos Destacados
          </h2>



          <p className="mt-3 text-gray-600">
            Encuentra prendas seleccionadas para tu estilo.
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
        {filteredProducts.length === 0 && (

          <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow">

            <h3 className="text-xl font-bold text-black">
              No encontramos productos.
            </h3>

            <p className="mt-2 text-gray-600">
              Intenta cambiar la búsqueda o los filtros.
            </p>

          </div>

        )}



        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">


          {filteredProducts.map((product) => {


            const currentStatus =
              productStatus[product.id] ||
              product.status ||
              "Disponible";



            return (

              <div
                key={product.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >



                <Link href={`/products/${product.id}`}>

                  <div className="relative aspect-[4/5] overflow-hidden">


                    <Image
  src={
    typeof product.image === "string" &&
    product.image.trim() !== ""
      ? product.image
      : "/images/products/default.jpg"
  }
  alt={product.name}
  fill
  className="object-cover transition duration-500 group-hover:scale-110"
/>



                    {product.tag && (

  <span className="absolute bottom-3 left-3 z-30 rounded-full bg-black px-3 py-1 text-xs font-bold text-white shadow">
    {product.tag}
  </span>

)}



                    <div className="absolute left-3 top-3 z-20">
                   <FavoriteButton product={product} />
                   </div>



                    <span
                      className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow ${
                        currentStatus === "Disponible"
                          ? "bg-green-600"
                          : currentStatus === "En trato"
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                    >
                      {currentStatus}
                    </span>



                  </div>




                  <div className="p-5">


                    <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                      {product.category}
                    </p>



                    <h3 className="mt-2 text-lg font-black text-black transition group-hover:text-blue-600">
                      {product.name}
                    </h3>



                    <div className="mt-4 flex items-center justify-between">


                      <p className="text-2xl font-black text-black">

                        ${product.price}

                        <span className="ml-1 text-sm font-medium text-gray-500">
                          MXN
                        </span>

                      </p>



                      <span className="text-sm text-yellow-400">
                        ★★★★★
                      </span>


                    </div>



                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                      {product.description}
                    </p>


                  </div>


                </Link>




                <div className="space-y-3 border-t border-gray-100 px-5 py-5">


                  <button
  onClick={() => {

    addItem(product);

    updateStatus(
      product.id,
      "En trato"
    );

  }}
                    disabled={
                      isInCart(product.id) ||
                      currentStatus !== "Disponible"
                    }
                    className={`w-full rounded-2xl py-3 font-bold text-white transition ${
                      currentStatus !== "Disponible"
                        ? "cursor-not-allowed bg-gray-400"
                        : isInCart(product.id)
                        ? "cursor-not-allowed bg-green-600"
                        : "bg-blue-600 hover:scale-[1.02] hover:bg-blue-700"
                    }`}
                  >

                    {currentStatus === "Vendido"
                      ? "🔴 Vendido"
                      : currentStatus === "En trato"
                      ? "🟡 En trato"
                      : isInCart(product.id)
                      ? "✅ Producto en carrito"
                      : "🛒 Agregar al carrito"}

                  </button>





                  <Link
                    href={`/products/${product.id}`}
                    className="block w-full rounded-2xl border border-gray-300 py-3 text-center font-bold text-gray-800 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
                  >
                    👁️ Ver producto
                  </Link>





                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hola Nexa Shop, me interesa comprar ${product.name} con precio de $${product.price} MXN. ¿Está disponible?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-2xl bg-black py-3 text-center font-bold text-white transition hover:bg-green-600"
                  >
                    💬 Pedir por WhatsApp
                  </a>



                </div>


              </div>

            );


          })}


        </div>


      </div>


    </section>

  );

}
