import Link from "next/link";


export default function NosotrosPage() {

  return (

    <main className="min-h-screen bg-gray-50 py-28">


      <div className="mx-auto max-w-5xl px-6">


        <section className="rounded-3xl bg-white p-10 shadow-lg">


          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Sobre Nexa Shop
          </p>


          <h1 className="mt-4 text-4xl font-black text-black md:text-5xl">
            Moda seleccionada para personas con estilo propio
          </h1>


          <p className="mt-6 leading-8 text-gray-700">
            En Nexa Shop creemos que cada prenda puede representar
            una parte de tu personalidad. Por eso seleccionamos
            productos modernos, cómodos y con diseños pensados para
            diferentes estilos y ocasiones.
          </p>


        </section>





        <section className="mt-8 grid gap-8 md:grid-cols-3">


          <div className="rounded-2xl bg-white p-8 text-center shadow">

            <div className="text-5xl">
              ⭐
            </div>

            <h2 className="mt-4 text-xl font-bold text-black">
              Productos únicos
            </h2>

            <p className="mt-3 text-gray-600">
              Manejamos piezas seleccionadas para ofrecer opciones
              diferentes y exclusivas.
            </p>

          </div>





          <div className="rounded-2xl bg-white p-8 text-center shadow">

            <div className="text-5xl">
              💬
            </div>

            <h2 className="mt-4 text-xl font-bold text-black">
              Atención personalizada
            </h2>

            <p className="mt-3 text-gray-600">
              Te acompañamos durante tu compra mediante WhatsApp.
            </p>

          </div>





          <div className="rounded-2xl bg-white p-8 text-center shadow">

            <div className="text-5xl">
              🚚
            </div>

            <h2 className="mt-4 text-xl font-bold text-black">
              Entregas cómodas
            </h2>

            <p className="mt-3 text-gray-600">
              Coordinamos la entrega buscando la mejor opción.
            </p>

          </div>



        </section>






        <section className="mt-8 rounded-3xl bg-black p-10 text-center text-white">


          <h2 className="text-3xl font-black">
            ¿Encontraste algo que te gusta?
          </h2>


          <p className="mt-4 text-gray-300">
            Explora nuestro catálogo y encuentra tu próxima prenda favorita.
          </p>



          <Link
            href="/#productos"
            className="mt-6 inline-block rounded-full bg-blue-600 px-8 py-3 font-bold transition hover:bg-blue-700"
          >
            Ver catálogo
          </Link>


        </section>


      </div>


    </main>

  );

}