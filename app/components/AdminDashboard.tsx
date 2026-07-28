"use client";

interface AdminDashboardProps {
  total: number;
  available: number;
  pending: number;
  sold: number;
}

export default function AdminDashboard({
  total,
  available,
  pending,
  sold,
}: AdminDashboardProps) {
  const cards = [
    {
      title: "Productos",
      value: total,
      color: "bg-blue-600",
      icon: "📦",
    },
    {
      title: "Disponibles",
      value: available,
      color: "bg-green-600",
      icon: "🟢",
    },
    {
      title: "En trato",
      value: pending,
      color: "bg-yellow-500",
      icon: "🟡",
    },
    {
      title: "Vendidos",
      value: sold,
      color: "bg-red-600",
      icon: "🔴",
    },
  ];

  return (
    <div className="mb-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl bg-white p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-4xl font-black text-black">
                {card.value}
              </h2>
            </div>

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white ${card.color}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}