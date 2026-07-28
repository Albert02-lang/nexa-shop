export default function Testimonials() {

  const testimonials = [
    {
      name: "María González",
      comment:
        "Excelente atención, me ayudaron a elegir mi talla y la entrega fue muy rápida.",
      rating: 5,
      avatar: "MG",
    },
    {
      name: "Carlos Hernández",
      comment:
        "La calidad de la ropa superó mis expectativas. Definitivamente volveré a comprar.",
      rating: 5,
      avatar: "CH",
    },
    {
      name: "Ana López",
      comment:
        "Me gustó mucho la atención personalizada por WhatsApp. Muy recomendable.",
      rating: 5,
      avatar: "AL",
    },
  ];


  return (
    <section className="bg-gray-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">

          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Clientes satisfechos
          </p>

          <h2 className="mt-2 text-4xl font-bold text-black">
            💬 Opiniones de nuestros clientes
          </h2>

          <p className="mt-3 text-gray-600">
            La confianza de nuestros clientes es lo más importante.
          </p>

        </div>


        <div className="grid gap-8 md:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="rounded-2xl bg-white p-8 shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                  {item.avatar}
                </div>


                <div>

                  <h3 className="font-bold text-black">
                    {item.name}
                  </h3>

                  <div className="text-yellow-400">
                    {"★".repeat(item.rating)}
                  </div>

                </div>

              </div>


              <p className="mt-6 leading-7 text-gray-600">
                "{item.comment}"
              </p>


            </div>

          ))}

        </div>

      </div>

    </section>
  );
}