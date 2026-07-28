"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { products, type Product } from "../../data/products";
import { useProductStore } from "../../lib/product-store";

import AddProductForm from "../components/AddProductForm";
import AdminDashboard from "../components/AdminDashboard";
import EditProductModal from "../components/EditProductModal";

export default function AdminPage() {


  const [, forceUpdate] = useState(0);


  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);


  const [search, setSearch] = useState("");


  const [filterStatus, setFilterStatus] =
    useState("Todos");
    const [filterType, setFilterType] =
  useState("Todos");
    const [sortBy, setSortBy] =
  useState("recientes");


  useEffect(() => {


    const refresh = () => {

      forceUpdate((value) => value + 1);

    };


    window.addEventListener(
      "product-status-change",
      refresh
    );


    window.addEventListener(
      "storage",
      refresh
    );


    return () => {

      window.removeEventListener(
        "product-status-change",
        refresh
      );


      window.removeEventListener(
        "storage",
        refresh
      );

    };


  }, []);





  const productStatus = useProductStore(
    (state) => state.productStatus
  );



  const productsAdded = useProductStore(
  (state) => state.productsAdded
);

const allProducts = [
  ...products,
  ...productsAdded,
];



  const updateStatus = useProductStore(
    (state) => state.updateStatus
  );

  const deleteProduct = useProductStore(
  (state) => state.deleteProduct
);


const updateProduct = useProductStore(
  (state) => state.updateProduct
);




  const filteredProducts =
  allProducts.filter((product) => {

    const currentStatus =
      productStatus[product.id] ||
      product.status ||
      "Disponible";


    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );


    const matchesStatus =
      filterStatus === "Todos" ||
      currentStatus === filterStatus;

      const matchesType =
  filterType === "Todos" ||
  product.type?.trim() === filterType;
return (
  matchesSearch &&
  matchesStatus &&
  matchesType
);

  });


const sortedProducts =
  [...filteredProducts].sort((a, b) => {


    if (sortBy === "nombre") {

      return a.name.localeCompare(
        b.name
      );

    }


    if (sortBy === "precio-menor") {

      return a.price - b.price;

    }


    if (sortBy === "precio-mayor") {

      return b.price - a.price;

    }


    return b.id - a.id;

  });

  const totalProducts = allProducts.length;

const availableProducts =
  allProducts.filter(
    (product) =>
      (
        productStatus[product.id] ||
        product.status
      ) === "Disponible"
  ).length;


const pendingProducts =
  allProducts.filter(
    (product) =>
      (
        productStatus[product.id] ||
        product.status
      ) === "En trato"
  ).length;


const soldProducts =
  allProducts.filter(
    (product) =>
      (
        productStatus[product.id] ||
        product.status
      ) === "Vendido"
  ).length;






  return (


    <main className="min-h-screen bg-gray-100 py-20">


      <div className="mx-auto max-w-7xl px-6">



        <h1 className="mb-10 text-4xl font-black text-black">
  Panel de Administración
</h1>
<AdminDashboard

  total={totalProducts}

  available={availableProducts}

  pending={pendingProducts}

  sold={soldProducts}

/>


<AddProductForm />
<div className="mb-10 grid gap-4 md:grid-cols-2">


  <input
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    placeholder="🔎 Buscar producto..."
    className="rounded-xl border p-3 text-black"
  />


  <select
    value={filterStatus}
    onChange={(e) =>
      setFilterStatus(e.target.value)
    }
    className="rounded-xl border p-3 text-black"
  >

    <option value="Todos">
      Todos los estados
    </option>

    <option value="Disponible">
      Disponible
    </option>

    <option value="En trato">
      En trato
    </option>

    <option value="Vendido">
      Vendido
    </option>

  </select>



  <select
    value={filterType}
    onChange={(e) =>
      setFilterType(e.target.value)
    }
    className="rounded-xl border p-3 text-black"
  >

    <option value="Todos">
      Todos los tipos
    </option>

    <option value="Playera">
      Playera
    </option>

    <option value="Sudadera">
      Sudadera
    </option>

    <option value="Jeans">
      Jeans
    </option>

    <option value="Chamarra">
      Chamarra
    </option>

    <option value="Calzado">
      Calzado
    </option>

    <option value="Accesorio">
      Accesorio
    </option>

  </select>



  <select
    value={sortBy}
    onChange={(e) =>
      setSortBy(e.target.value)
    }
    className="rounded-xl border p-3 text-black"
  >

    <option value="recientes">
      Más recientes
    </option>

    <option value="nombre">
      Nombre A-Z
    </option>

    <option value="precio-menor">
      Precio menor
    </option>

    <option value="precio-mayor">
      Precio mayor
    </option>

  </select>


</div>




        <p className="mb-10 text-gray-600">
          Gestiona la disponibilidad de tus productos Nexa Shop.
        </p>







        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">





          {sortedProducts.map((product) => {
            
            const currentStatus =
              productStatus[product.id] ||
              product.status ||
              "Disponible";





            return (



              <div
                key={product.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg"
              >





                <div className="relative h-72">



                  <Image
                    src={
                      typeof product.image === "string" &&
                      product.image.trim() !== ""
                        ? product.image
                        : "/images/products/default.jpg"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                  />





                  <span
                    className={`absolute right-4 top-4 rounded-full px-4 py-2 text-sm font-bold text-white ${
                      currentStatus === "Disponible"
                        ? "bg-green-600"
                        : currentStatus === "En trato"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                  >

                    {currentStatus}

                  </span>




                </div>









                <div className="p-6">





                  <p className="text-sm font-bold uppercase text-blue-600">
                    {product.category}
                  </p>





                  <h2 className="mt-2 text-2xl font-black text-black">
                    {product.name}
                  </h2>





                  <p className="mt-3 text-xl font-bold text-black">
                    ${product.price} MXN
                  </p>








                  <div className="mt-6 space-y-3">






                    <button
                      onClick={() =>
                        updateStatus(
                          product.id,
                          "Disponible"
                        )
                      }
                      className="w-full rounded-xl bg-green-600 py-3 font-bold text-white"
                    >

                      🟢 Disponible

                    </button>








                    <button
                      onClick={() =>
                        updateStatus(
                          product.id,
                          "En trato"
                        )
                      }
                      className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-white"
                    >

                      🟡 En trato

                    </button>







<button
  onClick={() =>
    updateStatus(
      product.id,
      "Vendido"
    )
  }
  className="w-full rounded-xl bg-red-600 py-3 font-bold text-white"
>
  🔴 Vendido
</button>

<button
  onClick={() => {
    console.log("clic editar", product);
    setSelectedProduct(product);
  }}
  className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
>
  ✏️ Editar producto
</button>

<button
  onClick={() => {
    const confirmDelete = confirm(
      "¿Eliminar este producto?"
    );

    if (confirmDelete) {
      deleteProduct(product.id);
    }
  }}
  className="w-full rounded-xl bg-gray-900 py-3 font-bold text-white"
>
  🗑️ Eliminar
</button>







                  </div>





                </div>





              </div>



            );


          })}





        </div>

        <EditProductModal

  product={selectedProduct}

  onClose={() =>

    setSelectedProduct(null)
  }
/>



      </div>






    </main>


  );


}