export default function Footer() {
  return (
    <footer className="bg-black py-10 text-white">

      <div className="mx-auto max-w-7xl px-6 text-center">

        <h2 className="text-3xl font-black">
          Nexa
          <span className="text-blue-500">
            Shop
          </span>
        </h2>


        <p className="mt-3 text-gray-300">
          Moda para todos con estilo y piezas únicas.
        </p>


        <div className="mt-6 flex flex-col justify-center gap-4 text-sm text-gray-400 sm:flex-row">

          <a
            href="/"
            className="transition hover:text-white"
          >
            Inicio
          </a>


          <a
            href="/#productos"
            className="transition hover:text-white"
          >
            Productos
          </a>


          <a
            href="/#contacto"
            className="transition hover:text-white"
          >
            Contacto
          </a>

        </div>


        <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-500">

          © {new Date().getFullYear()} Nexa Shop. Todos los derechos reservados.

        </div>


      </div>


    </footer>
  );
}