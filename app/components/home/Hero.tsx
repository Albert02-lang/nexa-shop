import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-gray-100 px-6">

      {/* Fondos decorativos */}
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[550px] w-[550px] rounded-full bg-sky-400/10 blur-3xl" />


      <div className="relative z-10 mx-auto max-w-6xl text-center">


        {/* Etiqueta superior */}
        <div className="mb-8 inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-6 py-3 shadow-md backdrop-blur">

          <span className="mr-2">
            ✨
          </span>

          <p className="text-xs font-bold uppercase tracking-[4px] text-blue-600 md:text-sm">
            Nueva colección 2026
          </p>

        </div>



        {/* Título principal */}
        <h1 className="text-5xl font-black leading-tight text-black md:text-7xl">

          Tu estilo,
          <span className="block text-blue-600">
            tu identidad
          </span>

        </h1>



        {/* Texto */}
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-700 md:text-xl">

          Descubre prendas modernas para hombre, mujer y niños en{" "}

          <span className="font-bold text-black">
            Nexa Shop
          </span>

          .

          Moda actual, atención personalizada y productos elegidos para acompañarte en cada momento.

        </p>



        {/* Botones */}
        <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">


          <Link
            href="/#productos"
            className="rounded-full bg-black px-10 py-4 font-bold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-blue-600"
          >
            🛍️ Explorar catálogo
          </Link>



          <Link
            href="/#productos"
            className="rounded-full border-2 border-black bg-white px-10 py-4 font-bold text-black shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-black hover:text-white"
          >
            🔥 Ver novedades
          </Link>


        </div>



        {/* Confianza rápida */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-600">

          <span>
            ✓ Moda para toda la familia
          </span>

          <span>
            ✓ Atención personalizada
          </span>

          <span>
            ✓ Compra fácil por WhatsApp
          </span>

        </div>



        {/* Indicador */}
        <div className="mt-14 animate-bounce text-4xl text-blue-600">
          ↓
        </div>


      </div>

    </section>
  );
}