"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCartStore } from "../../lib/cart-store";


export default function CartPage() {


  const items = useCartStore(
    (state) => state.items
  );


  const removeItem = useCartStore(
    (state) => state.removeItem
  );


  const [name, setName] = useState("");
  const [deliveryPlace, setDeliveryPlace] = useState("");
  const [comments, setComments] = useState("");



  const total = items.reduce(
    (sum, item) =>
      sum + item.price,
    0
  );



  const whatsappNumber = "525535059049";



  const productsMessage = items
    .map(
      (item) =>
        `${item.name} - $${item.price} MXN | Talla: ${
          item.sizes?.[0] || "Única"
        } | Color: ${
          item.colors?.[0] || "Único"
        }`
    )
    .join("\n");





  const whatsappMessage = encodeURIComponent(
    `Hola, quiero reservar una pieza de Nexa Shop:

Cliente:
${name}

Lugar de entrega:
${deliveryPlace}

Piezas seleccionadas:
${productsMessage}

Total:
$${total} MXN

Comentarios:
${comments || "Sin comentarios"}

Gracias.`
  );





  const canSendOrder =
    name.trim() !== "" &&
    deliveryPlace.trim() !== "" &&
    items.length > 0;




  return (

    <main className="min-h-screen bg-gray-50 py-28">


      <div className="mx-auto max-w-7xl px-4 sm:px-6">


        <div className="mb-10">

          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Nexa Shop
          </p>


          <h1 className="mt-2 text-4xl font-black text-black">
            ⭐ Reservar piezas
          </h1>


          <p className="mt-3 text-gray-600">
            Revisa tus productos únicos antes de enviar tu pedido.
          </p>

        </div>





        {items.length === 0 ? (


          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">


            <div className="text-5xl">
              🛍️
            </div>


            <h2 className="mt-5 text-2xl font-bold text-black">
              No tienes piezas reservadas
            </h2>


            <p className="mt-3 text-gray-600">
              Agrega productos exclusivos para continuar.
            </p>


            <Link
              href="/#productos"
              className="mt-6 inline-block rounded-full bg-black px-8 py-3 font-bold text-white transition hover:bg-blue-600"
            >
              Ver productos
            </Link>


          </div>



        ) : (


          <div className="grid gap-8 lg:grid-cols-3">



            <div className="space-y-5 lg:col-span-2">


              {items.map((item) => (


                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-3xl bg-white p-5 shadow-md sm:flex-row"
                >


                  <div className="relative h-40 w-full overflow-hidden rounded-2xl sm:h-32 sm:w-32">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />

                  </div>




                  <div className="flex-1">


                    <h2 className="text-xl font-black text-black">
                      {item.name}
                    </h2>


                    <p className="mt-2 text-lg font-bold text-blue-600">
                      ${item.price} MXN
                    </p>




                    <div className="mt-4 rounded-xl bg-gray-100 px-4 py-3">


                      <p className="font-bold text-black">
                        ⭐ Pieza única disponible
                      </p>


                      <p className="mt-2 text-sm text-gray-700">
                        👕 Talla: {item.sizes?.[0] || "Única"}
                      </p>


                      <p className="text-sm text-gray-700">
                        🎨 Color: {item.colors?.[0] || "Único"}
                      </p>


                    </div>





                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-5 rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
                    >
                      🗑️ Quitar pieza
                    </button>


                  </div>


                </div>


              ))}


            </div>





            <div className="h-fit rounded-3xl bg-white p-6 shadow-lg">


              <h2 className="text-2xl font-black text-black">
                Datos del pedido
              </h2>




              <div className="mt-6 space-y-4">


                <input
                  type="text"
                  placeholder="Nombre del cliente"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:border-blue-600"
                />



                <input
                  type="text"
                  placeholder="Lugar de entrega sugerido"
                  value={deliveryPlace}
                  onChange={(e) =>
                    setDeliveryPlace(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:border-blue-600"
                />



                <textarea
                  placeholder="Comentarios adicionales (opcional)"
                  value={comments}
                  onChange={(e) =>
                    setComments(e.target.value)
                  }
                  className="h-28 w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:border-blue-600"
                />


              </div>





              <div className="mt-8 rounded-2xl bg-gray-50 p-5">


                <p className="text-gray-600">
                  Total de reserva
                </p>


                <p className="mt-2 text-4xl font-black text-black">
                  ${total}

                  <span className="ml-2 text-lg font-medium text-gray-500">
                    MXN
                  </span>

                </p>


              </div>






              <a
                href={
                  canSendOrder
                    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 block rounded-2xl py-4 text-center font-bold text-white transition ${
                  canSendOrder
                    ? "bg-black hover:bg-green-600"
                    : "cursor-not-allowed bg-gray-400"
                }`}
              >
                💬 Enviar reserva por WhatsApp
              </a>





              <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm text-gray-700">

                <p>
                  ⭐ Producto exclusivo de una pieza
                </p>

                <p className="mt-2">
                  🚚 Entrega personalizada
                </p>

                <p className="mt-2">
                  💬 Atención directa por WhatsApp
                </p>

              </div>


            </div>


          </div>


        )}


      </div>


    </main>

  );

}