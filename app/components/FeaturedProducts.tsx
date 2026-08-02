"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";

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



  const loadProducts =
    useProductStore(
      (state) => state.loadProducts
    );



  const updateStatus =
    useProductStore(
      (state) => state.updateStatus
    );





  useEffect(() => {


    loadProducts();



    const syncProducts = () => {


      loadProducts();


    };



    window.addEventListener(
      "product-status-change",
      syncProducts
    );



    return () => {


      window.removeEventListener(
        "product-status-change",
        syncProducts
      );


    };


  }, [loadProducts]);







  const [search, setSearch] =
    useState("");



  const [category, setCategory] =
    useState("Todos");



  const [sort, setSort] =
    useState("default");






  const isInCart = (
    id:number
  ) => {


    return cartItems.some(

      (item) =>

        item.id === id

    );


  };







  const filteredProducts =
    useMemo(() => {


      let list = [

        ...productsAdded,

      ];



      if(category !== "Todos"){


        list =
          list.filter(

            (product)=>

              product.category === category

          );


      }





      if(search.trim() !== ""){


        const text =
          search.toLowerCase();



        list =
          list.filter(

            (product)=>

              product.name
              .toLowerCase()
              .includes(text)

              ||

              product.category
              .toLowerCase()
              .includes(text)

              ||

              product.description
              .toLowerCase()
              .includes(text)

          );


      }



      switch(sort){


        case "price-asc":


          list.sort(

            (a,b)=>

              a.price-b.price

          );


          break;



        case "price-desc":


          list.sort(

            (a,b)=>

              b.price-a.price

          );


          break;



        case "name":


          list.sort(

            (a,b)=>

              a.name.localeCompare(
                b.name
              )

          );


          break;


      }




      return list;



    },[

      productsAdded,

      search,

      category,

      sort,

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





        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">


          {filteredProducts.map((product)=>{


            const currentStatus =
              product.status ?? "Disponible";



            const reserved =
              isInCart(product.id);




            const handleReserve =
              async () => {


                if(
                  reserved ||
                  currentStatus !== "Disponible"
                ){

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
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-2xl"
              >



                <Link
                  href={`/products/${product.id}`}
                >


                  <div className="relative aspect-[4/5] overflow-hidden">


                    <Image

                      src={
                        product.image &&
                        product.image.trim() !== ""

                        ? product.image

                        : "/images/products/default.jpg"

                      }

                      alt={product.name}

                      fill

                      sizes="(max-width:768px) 100vw,25vw"

                      className="object-cover transition duration-500 group-hover:scale-110"

                    />



                    <div className="absolute left-3 top-3">

                      <FavoriteButton
                        product={product}
                      />

                    </div>




                    <span
                      className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white ${
                        
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



                    <h3 className="mt-2 text-lg font-black text-black">

                      {product.name}

                    </h3>




                    <p className="mt-4 text-2xl font-black text-black">

                      ${product.price}

                      <span className="ml-1 text-sm text-gray-500">
                        MXN
                      </span>

                    </p>




                    <p className="mt-3 line-clamp-2 text-sm text-gray-600">

                      {product.description}

                    </p>



                  </div>



                </Link>






                <div className="space-y-3 border-t px-5 py-5">



                  <button

                    onClick={handleReserve}

                    disabled={
                      reserved ||
                      currentStatus !== "Disponible"
                    }

                    className={`w-full rounded-2xl py-3 font-bold text-white transition ${
                      
                      currentStatus === "En trato"

                      ? "cursor-not-allowed bg-yellow-500"

                      : currentStatus === "Vendido"

                      ? "cursor-not-allowed bg-red-600"

                      : reserved

                      ? "cursor-not-allowed bg-green-600"

                      : "bg-blue-600 hover:bg-blue-700"

                    }`}

                  >


                    {

                    currentStatus === "En trato"

                    ? "🟡 Producto en trato"


                    :

                    currentStatus === "Vendido"

                    ? "🔴 Producto vendido"


                    :

                    reserved

                    ? "✅ Producto en carrito"


                    :

                    "🛒 Agregar al carrito"

                    }


                  </button>





                  <Link

                    href={`/products/${product.id}`}

                    className="block w-full rounded-2xl border py-3 text-center font-bold"

                  >

                    👁️ Ver producto

                  </Link>






                  <a

                    href={`https://wa.me/${whatsappNumber}?text=Hola Nexa Shop, me interesa ${product.name}`}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="block w-full rounded-2xl bg-black py-3 text-center font-bold text-white"

                  >

                    💬 WhatsApp

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