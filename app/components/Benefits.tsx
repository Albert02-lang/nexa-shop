export default function Benefits() {
  const benefits = [
    {
      icon: "🚚",
      title: "Entrega personalizada",
      description:
        "Acordamos el punto de entrega por WhatsApp para mayor comodidad.",
    },
    {
      icon: "🛡️",
      title: "Compra con confianza",
      description:
        "Atención personalizada antes y después de tu compra.",
    },
    {
      icon: "👕",
      title: "Moda para toda la familia",
      description:
        "Encuentra opciones para hombre, mujer y niños.",
    },
    {
      icon: "💬",
      title: "Atención rápida",
      description:
        "Resolvemos tus dudas directamente por WhatsApp.",
    },
  ];

  return (
    <section className="bg-transparent py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            ¿Por qué elegirnos?
          </p>

          <h2 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
            Ventajas de Nexa Shop
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Diseñamos una experiencia de compra sencilla, segura y personalizada.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="
                group
                rounded-3xl
                bg-gray-50
                p-8
                text-center
                shadow-sm
                transition
                duration-300
                hover:-translate-y-3
                hover:bg-white
                hover:shadow-xl
              "
            >
              <div
                className="
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
                "
              >
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-black text-black">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}