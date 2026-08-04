"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCartStore } from "../../lib/cart-store";
import { useFavoritesStore } from "../../lib/favorites-store";


export default function Navbar() {


  const [open, setOpen] = useState(false);


  const itemsCount = useCartStore(
    (state) => state.items.length
  );


  const favoritesCount = useFavoritesStore(
    (state) => state.favorites.length
  );



  const links = [
    { name: "Inicio", href: "/" },
    { name: "Hombre", href: "/category/Hombre" },
    { name: "Mujer", href: "/category/Mujer" },
    { name: "Niños", href: "/category/Niños" },
    { name: "Catálogo", href: "/#productos" },
    { name: "Contacto", href: "/#contacto" },
  ];



  return (

    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur">


      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">


        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
        >


          <Image
  src="/images/logo.png"
  width={200}
  height={80}
  className="h-10 w-auto"
  alt="Nexa Shop"
/>


          <div>

            <h1 className="text-2xl font-black text-black">
              Nexa
              <span className="text-blue-600">
                Shop
              </span>
            </h1>


            <p className="text-xs uppercase tracking-widest text-gray-500">
              Moda para todos
            </p>


          </div>


        </Link>





        <ul className="hidden items-center gap-8 text-sm font-semibold md:flex">


          {links.map((link) => (

            <li key={link.name}>

              <Link
                href={link.href}
                className="text-gray-900 transition hover:text-blue-600"
              >
                {link.name}
              </Link>

            </li>

          ))}






          <li>

            <Link
              href="/favorites"
              className="relative text-xl transition hover:scale-110"
            >

              ❤️


              {favoritesCount > 0 && (

                <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">

                  {favoritesCount}

                </span>

              )}

            </Link>


          </li>






          <li>

            <Link
              href="/cart"
              className="relative rounded-full bg-black px-6 py-3 text-white transition hover:bg-blue-600"
            >

              ⭐ Reservas


              {itemsCount > 0 && (

                <span className="absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">

                  {itemsCount}

                </span>

              )}


            </Link>


          </li>


        </ul>





        <button
          onClick={() => setOpen(!open)}
          className="text-3xl md:hidden"
          aria-label="Abrir menú"
        >

          {open ? "✕" : "☰"}

        </button>



      </nav>






      {open && (

        <div className="animate-in slide-in-from-top border-t bg-white px-5 py-6 shadow-lg md:hidden">


          <ul className="flex flex-col gap-5 font-semibold">


            {links.map((link) => (

              <li key={link.name}>

                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-gray-900 hover:text-blue-600"
                >

                  {link.name}

                </Link>


              </li>

            ))}





            <li>

              <Link
                href="/favorites"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-red-50 px-4 py-3 text-gray-900"
              >

                ❤️ Favoritos ({favoritesCount})

              </Link>


            </li>






            <li>

              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-black px-5 py-3 text-center text-white"
              >

                ⭐ Reservas ({itemsCount})

              </Link>


            </li>



          </ul>


        </div>

      )}


    </header>

  );

}