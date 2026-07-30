"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { Product } from "../../data/products";
import { useProductStore } from "../../lib/product-store";

import AddProductForm from "../components/AddProductForm";
import AdminDashboard from "../components/AdminDashboard";
import EditProductModal from "../components/EditProductModal";;
import AdminProductCard from "../components/AdminProductCard";

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

const loadProducts = useProductStore(
  (state) => state.loadProducts
);
useEffect(() => {

  loadProducts();

}, [loadProducts]);

const allProducts = [
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





         {sortedProducts.map((product) => (
  <AdminProductCard
    key={product.id}
    product={product}
    currentStatus={
      productStatus[product.id] ||
      product.status ||
      "Disponible"
    }
    onStatusChange={updateStatus}
    onEdit={setSelectedProduct}
    onDelete={(id) => {
      const confirmDelete = confirm(
        "¿Eliminar este producto?"
      );

      if (confirmDelete) {
        deleteProduct(id);
      }
    }}
  />
))}





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