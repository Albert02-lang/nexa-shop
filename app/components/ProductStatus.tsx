interface ProductStatusProps {
  status: "Disponible" | "En trato" | "Vendido";
}


export default function ProductStatus({
  status,
}: ProductStatusProps) {


  return (

    <span
      className={`rounded-full px-4 py-2 text-sm font-bold text-white ${
        status === "Disponible"
          ? "bg-green-600"
          : status === "En trato"
          ? "bg-yellow-500"
          : "bg-red-600"
      }`}
    >

      {status}

    </span>

  );

}