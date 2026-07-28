"use client";

import { useState } from "react";

import { useProductStore } from "../../lib/product-store";


export default function AddProductForm() {


  const addProduct = useProductStore(
    (state) => state.addProduct
  );


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const [message, setMessage] = useState("");



  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    if (
      name.trim() === "" ||
      price.trim() === ""
    ) {

      setMessage(
        "⚠️ Completa nombre y precio"
      );

      return;

    }



    const newProduct = {

      id: Date.now(),

      name,

      price: Number(price),

      image:
        image !== ""
          ? image
          : "/images/products/default.jpg",


      category:
        category || "Sin categoría",


      type:
        type || "Sin tipo",


      gender: "Unisex",


      description:
        "Producto agregado desde administración.",


      sizes: [],


      colors: [],


      available: true,


      status: "Disponible" as const,


      tag: "Nuevo",

    };



    addProduct(newProduct);



    setMessage(
      "✅ Producto agregado correctamente"
    );


    setName("");
    setPrice("");
    setCategory("");
    setType("");
    setImage("");
    setPreview("");

  };





  return (

    <form
      onSubmit={handleSubmit}
      className="mb-10 rounded-3xl bg-white p-6 shadow"
    >


      <h2 className="mb-6 text-2xl font-black text-black">
        ➕ Agregar producto
      </h2>



      <div className="grid gap-4 md:grid-cols-2">



        <input

          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }

          placeholder="Nombre del producto"

          className="rounded-xl border p-3 text-black"

        />





        <input

          value={price}

          onChange={(e) =>
            setPrice(e.target.value)
          }

          placeholder="Precio"

          type="number"

          className="rounded-xl border p-3 text-black"

        />





        <select

          value={category}

          onChange={(e) =>
            setCategory(e.target.value)
          }

          className="rounded-xl border p-3 text-black"

        >

          <option value="">
            Selecciona una categoría
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

          <option value="Accesorios">
            Accesorios
          </option>

        </select>





        <select

          value={type}

          onChange={(e) =>
            setType(e.target.value)
          }

          className="rounded-xl border p-3 text-black"

        >

          <option value="">
            Selecciona tipo de producto
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





        <div>

          <label className="mb-2 block font-semibold text-black">
            📷 Seleccionar imagen
          </label>


          <input

            type="file"

            accept="image/*"

            onChange={(e) => {


              const file =
                e.target.files?.[0];


              if (file) {

                const url =
                  URL.createObjectURL(file);


                setImage(url);

                setPreview(url);

              }


            }}

            className="w-full rounded-xl border p-3 text-black"

          />

        </div>


      </div>





      {preview && (

        <div className="mt-6">

          <p className="mb-2 font-semibold text-black">
            Vista previa:
          </p>


          <img

            src={preview}

            alt="Vista previa"

            className="h-40 w-40 rounded-xl object-cover"

          />

        </div>

      )}






      <button

        type="submit"

        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"

      >

        Guardar producto

      </button>






      {message && (

        <p className="mt-4 font-semibold text-blue-600">

          {message}

        </p>

      )}



    </form>

  );

}