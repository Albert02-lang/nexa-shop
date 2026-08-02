import Image from "next/image";

import { supabase } from "../../../lib/supabase";
import ProductStatusClient from "../../components/ProductStatusClient";
import ProductPurchase from "../../components/ProductPurchase";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {


  const { id } = await params;
if (!supabase) {
  return null;
}

if (!supabase) {
  return null;
}
const { data, error } = await supabase
  .from("products")
  .select("*")
  .eq("id", Number(id))
  .single();

  console.log("===== PRUEBA PRODUCTO =====");
console.log("ID:", id);
console.log("DATA:", JSON.stringify(data, null, 2));
console.log("ERROR:", error);

console.log("Producto desde Supabase:", data);
console.log("Error Supabase:", error);


const product = data && {
  id: data.id,
  name: data.name,
  price: data.price,
  image: data.image,
  category: data.category,
  gender: data.gender,
  description: data.description,
  size: data.size,
  sizes: data.sizes ?? [],
  colors: data.colors ?? [],
  available: data.available,
  status: data.status ?? "Disponible",
  tag: data.tag,
};

  if (!product) {

    return (

      <main className="flex min-h-screen items-center justify-center">

        <h1 className="text-3xl font-bold text-black">
          Producto no encontrado
        </h1>

      </main>

    );

  }



  return (

    <main className="min-h-screen bg-gray-50 py-28">


      <div className="mx-auto max-w-7xl px-6">


        <div className="grid gap-10 lg:grid-cols-2">



          {/* Imagen */}


          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">


            <div className="relative h-[550px]">


              <Image
  src={product.image || "/images/logo.png"}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover transition duration-500 hover:scale-105"
/>


            </div>





            {product.tag && (

              <span className="absolute left-6 top-6 rounded-full bg-black px-5 py-2 text-sm font-bold text-white">

                {product.tag}

              </span>

            )}






            <div className="absolute right-6 top-6">

  <ProductStatusClient productId={product.id} />

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





            <div className="mt-4 text-xl text-yellow-400">

              ★★★★★

            </div>







            <div className="mt-6">


              {product.oldPrice && (

                <p className="text-xl text-gray-400 line-through">

                  ${product.oldPrice} MXN

                </p>

              )}






              <p className="text-4xl font-black text-black">


                ${product.price}


                <span className="ml-2 text-lg font-medium text-gray-500">

                  MXN

                </span>


              </p>






              {product.oldPrice && (

                <p className="mt-2 font-semibold text-green-600">

                  Ahorras ${product.oldPrice - product.price} MXN

                </p>

              )}



            </div>







            <div className="mt-6 rounded-2xl bg-blue-50 p-5">


              <p className="font-bold text-black">

                ⭐ Pieza única

              </p>



              <p className="mt-2 text-sm text-gray-700">

                Este producto cuenta con una sola existencia.
                Consulta disponibilidad antes de reservar.

              </p>


            </div>







            <p className="mt-6 leading-7 text-gray-700">

              {product.description}

            </p>








            {/* Características */}



            <div className="mt-8 rounded-2xl bg-gray-50 p-5">


              <h3 className="font-bold text-black">

                Características del producto

              </h3>





              <div className="mt-4 space-y-3 text-gray-700">



                <p>

                  👕 Talla:

                  <span className="ml-2 font-semibold text-black">

                   {product.size || product.sizes?.[0] || "Única"}

                  </span>

                </p>





                <p>

                  🎨 Color:

                  <span className="ml-2 font-semibold text-black">

                    {product.colors[0] || "Variado"}

                  </span>

                </p>





                <p>

                  📦 Disponibilidad:

                  <span className="ml-2 font-semibold text-green-600">

                    Pieza única

                  </span>

                </p>



              </div>


            </div>








            {/* Compra dinámica */}



            <div className="mt-10">


              <ProductPurchase product={product} />


            </div>








            {/* Confianza */}



            <div className="mt-10 grid gap-4 rounded-2xl bg-gray-50 p-5 text-sm text-gray-700 sm:grid-cols-3">



              <div>

                🚚

                <p className="mt-1 font-semibold">

                  Entrega personalizada

                </p>

              </div>





              <div>

                🛡️

                <p className="mt-1 font-semibold">

                  Compra segura

                </p>

              </div>





              <div>

                💬

                <p className="mt-1 font-semibold">

                  Atención rápida

                </p>

              </div>



            </div>



          </div>



        </div>



      </div>



    </main>

  );

}