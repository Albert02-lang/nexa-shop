"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-74px)] overflow-hidden bg-transparent text-slate-900 dark:text-white">
      {/* =========================================================
          FONDO / ONDAS DECORATIVAS
      ========================================================= */}

      {/* Luz azul superior derecha */}
      <div
        className="
          pointer-events-none
          absolute
          -right-40
          -top-40
          h-[600px]
          w-[600px]
          rounded-full
          bg-blue-300/30
          blur-3xl
          dark:bg-blue-700/20
        "
      />

      {/* Onda azul izquierda */}
      <div
        className="
          pointer-events-none
          absolute
          -left-72
          bottom-[-300px]
          h-[700px]
          w-[900px]
          rotate-[-20deg]
          rounded-[50%]
          border-t-[90px]
          border-blue-400/30
          bg-blue-400/10
          blur-[1px]
          dark:border-blue-600/50
          dark:bg-blue-600/10
        "
      />

      {/* Onda azul derecha */}
      <div
        className="
          pointer-events-none
          absolute
          -right-80
          bottom-[-260px]
          h-[600px]
          w-[900px]
          rotate-[-18deg]
          rounded-[50%]
          border-t-[80px]
          border-blue-400/25
          bg-blue-300/10
          dark:border-blue-600/50
          dark:bg-blue-700/10
        "
      />

      {/* Línea / onda superior */}
      <div
        className="
          pointer-events-none
          absolute
          -left-20
          top-24
          h-[260px]
          w-[900px]
          rotate-[18deg]
          rounded-[50%]
          border-b-[55px]
          border-blue-300/20
          dark:border-blue-700/30
        "
      />

      {/* Puntos decorativos */}
      <div
        className="
          pointer-events-none
          absolute
          right-10
          top-40
          h-40
          w-40
          opacity-30
          [background-image:radial-gradient(circle,_#3b82f6_1.5px,_transparent_1.5px)]
          [background-size:14px_14px]
          dark:opacity-20
        "
      />

      {/* =========================================================
          LOGO GRANDE COMO MARCA DE AGUA
      ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          right-[-100px]
          top-1/2
          z-0
          hidden
          w-[700px]
          -translate-y-1/2
          opacity-[0.09]
          md:block
          lg:w-[760px]
          dark:opacity-[0.12]
        "
      >
        <Image
          src="/images/logo.png"
          alt=""
          width={900}
          height={900}
          className="h-auto w-full object-contain"
          aria-hidden="true"
          priority
        />
      </div>

      {/* =========================================================
          CONTENIDO PRINCIPAL
      ========================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-74px)]
          max-w-7xl
          items-center
          px-6
          py-20
          sm:px-10
          lg:px-16
        "
      >
        <div className="w-full max-w-3xl">

          {/* Etiqueta superior */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-blue-600" />

            <span className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              Colección 2026
            </span>
          </div>

          {/* =====================================================
              TÍTULO
          ===================================================== */}

          <h1
            className="
              max-w-4xl
              text-6xl
              font-black
              leading-[0.9]
              tracking-[-0.055em]
              text-slate-950
              sm:text-7xl
              md:text-8xl
              dark:text-white
            "
          >
            Tu estilo,
            <span className="block text-blue-600 dark:text-blue-500">
              tu identidad
            </span>
          </h1>

          {/* =====================================================
              DESCRIPCIÓN
          ===================================================== */}

          <p
            className="
              mt-7
              max-w-2xl
              text-base
              leading-7
              text-slate-700
              sm:text-lg
              dark:text-slate-300
            "
          >
            Descubre prendas modernas para hombre, mujer y niños en{" "}
            <strong className="font-black text-slate-950 dark:text-white">
              Nexa Shop.
            </strong>{" "}
            Moda actual, atención personalizada y productos elegidos para
            acompañarte en cada momento.
          </p>

          {/* =====================================================
              BOTONES
          ===================================================== */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            {/* Explorar catálogo */}
            <Link
              href="/#productos"
              className="
                group
                inline-flex
                min-w-[260px]
                items-center
                justify-center
                gap-3
                rounded-full
                border-2
                border-blue-600
                bg-slate-950
                px-7
                py-4
                text-sm
                font-black
                text-white
                shadow-[0_8px_25px_rgba(37,99,235,0.25)]
                transition
                duration-300
                hover:-translate-y-1
                hover:bg-blue-600
                dark:bg-blue-600
                dark:hover:bg-blue-500
              "
            >
              <span className="text-xl">🛍️</span>

              <span>Explorar catálogo</span>

              <span className="text-2xl leading-none transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Ver novedades */}
            <Link
              href="/#productos"
              className="
                group
                inline-flex
                min-w-[250px]
                items-center
                justify-center
                gap-3
                rounded-full
                border-2
                border-slate-900/80
                bg-white/70
                px-7
                py-4
                text-sm
                font-black
                text-slate-900
                backdrop-blur-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:border-blue-600
                hover:text-blue-600
                dark:border-white/80
                dark:bg-slate-950/40
                dark:text-white
                dark:hover:border-blue-400
                dark:hover:text-blue-400
              "
            >
              <span className="text-xl">🔥</span>

              <span>Ver novedades</span>

              <span className="text-2xl leading-none text-blue-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-blue-400">
                →
              </span>
            </Link>
          </div>

          {/* =====================================================
              BENEFICIOS
          ===================================================== */}

          <div
            className="
              mt-10
              max-w-3xl
              overflow-hidden
              rounded-2xl
              border
              border-slate-900/10
              bg-white/35
              shadow-[0_12px_40px_rgba(15,23,42,0.04)]
              backdrop-blur-md
              transition-all
              duration-300
              dark:border-white/10
              dark:bg-slate-950/20
              dark:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
            "
          >
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
              "
            >

              {/* =================================================
                  MODA PARA TODA LA FAMILIA
              ================================================= */}

              <div
                className="
                  group
                  flex
                  items-center
                  gap-4
                  px-6
                  py-5
                  transition
                  duration-300
                  hover:bg-white/45
                  sm:border-r
                  sm:border-slate-900/10
                  dark:hover:bg-white/[0.04]
                  dark:sm:border-white/10
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    transition
                    duration-300
                    group-hover:scale-105
                    group-hover:bg-blue-100
                    dark:bg-blue-500/10
                    dark:text-blue-400
                    dark:group-hover:bg-blue-500/15
                  "
                >
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    aria-hidden="true"
                  >
                    <path
                      d="M17 7L7 13L12 22L16 20V39H32V20L36 22L41 13L31 7C28.5 10 19.5 10 17 7Z"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 9C20 12 28 12 28 9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-black leading-5 text-slate-900 dark:text-white">
                    Moda para
                    <br />
                    toda la familia
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Para cada estilo
                  </p>
                </div>
              </div>

              {/* =================================================
                  ATENCIÓN PERSONALIZADA
              ================================================= */}

              <div
                className="
                  group
                  flex
                  items-center
                  gap-4
                  border-t
                  border-slate-900/10
                  px-6
                  py-5
                  transition
                  duration-300
                  hover:bg-white/45
                  sm:border-t-0
                  sm:border-r
                  dark:border-white/10
                  dark:hover:bg-white/[0.04]
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                    transition
                    duration-300
                    group-hover:scale-105
                    group-hover:bg-blue-100
                    dark:bg-blue-500/10
                    dark:text-blue-400
                    dark:group-hover:bg-blue-500/15
                  "
                >
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    aria-hidden="true"
                  >
                    <circle
                      cx="24"
                      cy="15"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <path
                      d="M10 39C10 31.3 16.3 26 24 26C31.7 26 38 31.3 38 39"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-black leading-5 text-slate-900 dark:text-white">
                    Atención
                    <br />
                    personalizada
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Estamos para ayudarte
                  </p>
                </div>
              </div>

              {/* =================================================
                  WHATSAPP
              ================================================= */}

              <div
                className="
                  group
                  flex
                  items-center
                  gap-4
                  border-t
                  border-slate-900/10
                  px-6
                  py-5
                  transition
                  duration-300
                  hover:bg-white/45
                  sm:border-t-0
                  dark:border-white/10
                  dark:hover:bg-white/[0.04]
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-green-50
                    text-green-500
                    transition
                    duration-300
                    group-hover:scale-105
                    group-hover:bg-green-100
                    dark:bg-green-500/10
                    dark:text-green-400
                    dark:group-hover:bg-green-500/15
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8"
                    aria-hidden="true"
                  >
                    <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.5 0 .17 5.32.17 11.87c0 2.09.55 4.13 1.59 5.93L.07 24l6.34-1.66a11.85 11.85 0 0 0 5.63 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.41-8.41ZM12.05 21.77h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.76.98 1-3.67-.23-.38a9.85 9.85 0 0 1-1.51-5.25C2.16 6.43 6.6 1.99 12.05 1.99c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.88-9.89 9.88Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-black leading-5 text-slate-900 dark:text-white">
                    Compra fácil
                    <br />
                    por WhatsApp
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Atención rápida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          INDICADOR INFERIOR
      ========================================================= */}

      <div
        className="
          absolute
          bottom-5
          left-1/2
          hidden
          -translate-x-1/2
          items-center
          gap-3
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.3em]
          text-slate-400
          md:flex
          dark:text-slate-500
        "
      >
        <span>NexaShop</span>

        <span className="h-px w-10 bg-blue-500/50" />

        <span>Tu estilo, tu identidad</span>

        <span className="h-px w-10 bg-blue-500/50" />
      </div>
    </section>
  );
}