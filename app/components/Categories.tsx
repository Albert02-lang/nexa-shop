import Link from "next/link";


const categories = [
  {
    title: "Hombre",
    description: "Moda casual y formal para hombre",
    emoji: "👔",
    href: "/category/Hombre",
  },
  {
    title: "Mujer",
    description: "Las últimas tendencias para mujer",
    emoji: "👗",
    href: "/category/Mujer",
  },
  {
    title: "Niños",
    description: "Ropa cómoda y divertida",
    emoji: "🧒",
    href: "/category/Niños",
  },
  {
    title: "Accesorios",
    description: "Completa tu estilo",
    emoji: "👜",
    href: "/#productos",
  },
];


export default function Categories() {

  return (

    <section className="bg-white py-20">


      <div className="mx-auto max-w-7xl px-6">



        <div className="mb-12 text-center">


          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Encuentra tu estilo
          </p>


          <h2 className="mt-3 text-4xl font-black text-black">
            Explora nuestras categorías
          </h2>


          <p className="mt-4 text-gray-600">
            Selecciona tu colección favorita y descubre nuevos estilos.
          </p>


        </div>





        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">



          {categories.map((category) => (



            <Link
              key={category.title}
              href={category.href}
              className="
                group
                rounded-3xl
                border
                border-gray-100
                bg-gray-50
                p-8
                text-center
                shadow-sm
                transition
                duration-300
                hover:-translate-y-3
                hover:bg-white
                hover:shadow-2xl
              "
            >



              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-6xl shadow transition duration-300 group-hover:scale-110">

                {category.emoji}

              </div>





              <h3 className="mt-6 text-2xl font-black text-black">

                {category.title}

              </h3>





              <p className="mt-3 text-gray-600">

                {category.description}

              </p>





              <span className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition group-hover:bg-blue-600">

                Ver colección

              </span>



            </Link>



          ))}



        </div>



      </div>



    </section>


  );

}