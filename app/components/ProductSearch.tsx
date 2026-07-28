"use client";

interface ProductSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function ProductSearch({
  search,
  setSearch,
}: ProductSearchProps) {


  return (

    <div className="mb-8">


      <div className="relative">


        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl">
          🔍
        </span>



        <input
          type="text"
          placeholder="Buscar prendas, categorías o estilos..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            rounded-2xl
            border
            border-gray-200
            bg-white
            py-4
            pl-14
            pr-14
            text-black
            shadow-sm
            outline-none
            transition
            placeholder:text-gray-500
            focus:border-blue-600
            focus:ring-4
            focus:ring-blue-100
          "
        />



        {search && (

          <button
            onClick={() => setSearch("")}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              text-lg
              font-bold
              text-gray-400
              transition
              hover:text-black
            "
          >
            ✕
          </button>

        )}



      </div>



    </div>

  );
}