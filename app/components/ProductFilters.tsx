"use client";

interface ProductFiltersProps {
  category: string;
  setCategory: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

export default function ProductFilters({
  category,
  setCategory,
  sort,
  setSort,
}: ProductFiltersProps) {

  return (

    <div className="mb-10 rounded-3xl bg-white p-6 shadow-md">


      <div className="mb-6 flex items-center gap-3">

        <span className="text-2xl">
          ⚙️
        </span>


        <h3 className="text-2xl font-black text-black">
          Filtros
        </h3>


      </div>





      <div className="grid gap-6 md:grid-cols-2">



        {/* Categoría */}

        <div>


          <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-700">
            👕 Categoría
          </label>



          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              px-5
              py-4
              font-medium
              text-black
              outline-none
              transition
              focus:border-blue-600
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          >

            <option value="Todos">
              Todos los productos
            </option>


            <option value="Hombre">
              Hombre
            </option>


            <option value="Mujer">
              Mujer
            </option>


            <option value="Niños">
              Niños
            </option>


          </select>


        </div>





        {/* Orden */}

        <div>


          <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-700">
            🔽 Ordenar
          </label>



          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              px-5
              py-4
              font-medium
              text-black
              outline-none
              transition
              focus:border-blue-600
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          >

            <option value="default">
              ⭐ Productos destacados
            </option>


            <option value="price-asc">
              💰 Precio menor a mayor
            </option>


            <option value="price-desc">
              💎 Precio mayor a menor
            </option>


            <option value="name">
              🔤 Nombre A-Z
            </option>


          </select>



        </div>



      </div>



    </div>

  );
}