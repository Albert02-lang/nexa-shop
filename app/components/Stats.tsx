export default function Stats() {


  const stats = [

    {
      title: "Moda para todos",
      subtitle: "Hombre • Mujer • Niños",
      icon: "👕",
    },

    {
      title: "Calidad",
      subtitle: "Prendas cuidadosamente seleccionadas",
      icon: "⭐",
    },

    {
      title: "Atención personalizada",
      subtitle: "Pedidos directos por WhatsApp",
      icon: "💬",
    },

    {
      title: "Compra segura",
      subtitle: "Atención antes y después de tu compra",
      icon: "🛍️",
    },

  ];



  return (

<section className="bg-transparent py-16">


      <div className="mx-auto max-w-7xl px-6">


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">



          {stats.map((item) => (



            <div
              key={item.title}
              className="
                group
                rounded-3xl
                bg-white
                p-8
                text-center
                shadow-sm
                transition
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >



              <div className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-blue-50
                text-5xl
                transition
                duration-300
                group-hover:scale-110
              ">

                {item.icon}

              </div>





              <h3 className="mt-6 text-xl font-black text-black">

                {item.title}

              </h3>





              <p className="mt-3 text-sm leading-6 text-gray-600">

                {item.subtitle}

              </p>




            </div>



          ))}



        </div>



      </div>


    </section>


  );

}