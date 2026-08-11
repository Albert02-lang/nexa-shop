"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase-client";
import { useProductStore } from "../../lib/product-store";

import type { NewProduct } from "../../types/product";


export default function AddProductForm() {


  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("");

  const [type, setType] = useState("");

  const [gender, setGender] = useState("");

  const [description, setDescription] = useState("");

  const [tag, setTag] = useState("");

  const [size, setSize] = useState("");

  const [colors, setColors] = useState("");

  const [imageFile, setImageFile] =
    useState<File | null>(null);



  const [message, setMessage] =
    useState("");



  const [loading, setLoading] =
    useState(false);




  const addProduct =
    useProductStore(
      (state) => state.addProduct
    );





  const handleSubmit = async (
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





    try {


      setLoading(true);

      setMessage("");



      let imageUrl =
        "/images/products/default.jpg";






      // SUBIR IMAGEN AL STORAGE

      if(imageFile){



        const fileName =
          `${Date.now()}-${imageFile.name}`;



        const {
          error: uploadError
        } =
          await supabase.storage
            .from("products")
            .upload(
              fileName,
              imageFile
            );





        if(uploadError){

          throw uploadError;

        }





        const {
          data
        } =
          supabase.storage
            .from("products")
            .getPublicUrl(
              fileName
            );





        imageUrl =
          data.publicUrl;


      }








      // GUARDAR PRODUCTO MEDIANTE ZUSTAND

      const newProduct: NewProduct = {



        name,


        price:
          Number(price),



        image:
          imageUrl,



        category:
          category || "Sin categoría",



        type:
          type || "Sin tipo",



        gender:
          gender || "Unisex",



        description:
          description ||
          "Producto agregado desde administración.",



        size:
          size || "Única",

colors:
  colors
    ? colors
        .split(",")
        .map((color) => color.trim())
    : [],



        available:
          true,



        status:
          "Disponible",



        tag:
          tag || "Nuevo",



        stock:
          1,



      };
      await addProduct(newProduct);







      setMessage(
        "✅ Producto guardado correctamente"
      );






      // LIMPIAR FORMULARIO


      setSize("");

      setColors("");

      setName("");

      setPrice("");

      setCategory("");

      setType("");

      setGender("");

      setDescription("");

      setTag("");

      setImageFile(null);




    } catch(error:any){



      console.error(
        "ERROR COMPLETO:",
        error
      );



      setMessage(
        error?.message ??
        "❌ Error al guardar producto"
      );



    } finally {



      setLoading(false);



    }



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

          onChange={(e)=>
            setName(e.target.value)
          }

          placeholder="Nombre del producto"

          className="rounded-xl border p-3 text-black"

        />





        <input

          value={price}

          onChange={(e)=>
            setPrice(e.target.value)
          }

          placeholder="Precio"

          type="number"

          className="rounded-xl border p-3 text-black"

        />





        <select

          value={category}

          onChange={(e)=>
            setCategory(e.target.value)
          }

          className="rounded-xl border p-3 text-black"

        >

          <option value="">
            Categoría
          </option>

          <option>
            Hombre
          </option>

          <option>
            Mujer
          </option>

          <option>
            Niños
          </option>

          <option>
            Accesorios
          </option>


        </select>







        <select

          value={type}

          onChange={(e)=>
            setType(e.target.value)
          }

          className="rounded-xl border p-3 text-black"

        >

          <option value="">
            Tipo
          </option>


          <option>
            Playera
          </option>


          <option>
            Sudadera
          </option>


          <option>
            Jeans
          </option>


          <option>
            Chamarra
          </option>


          <option>
            Calzado
          </option>


        </select>







        <select

          value={gender}

          onChange={(e)=>
            setGender(e.target.value)
          }

          className="rounded-xl border p-3 text-black"

        >

          <option value="">
            Género
          </option>


          <option>
            Hombre
          </option>


          <option>
            Mujer
          </option>


          <option>
            Niños
          </option>


          <option>
            Unisex
          </option>


        </select>







        <select

          value={size}

          onChange={(e)=>
            setSize(e.target.value)
          }

          className="rounded-xl border p-3 text-black"

        >


          <option value="">
            Talla
          </option>


          <option>
            CH
          </option>


          <option>
            M
          </option>


          <option>
            G
          </option>


          <option>
            XL
          </option>


          <option>
            28
          </option>


          <option>
            30
          </option>


          <option>
            32
          </option>


          <option>
            34
          </option>


          <option>
            Única
          </option>


        </select>

        <input

  value={colors}

  onChange={(e)=>
    setColors(e.target.value)
  }

  placeholder="Colores (Ej: Negro, Blanco, Azul)"

  className="rounded-xl border p-3 text-black"

/>


        <input

          value={tag}

          onChange={(e)=>
            setTag(e.target.value)
          }

          placeholder="Etiqueta (Nuevo, Oferta...)"

          className="rounded-xl border p-3 text-black"

        />



      </div>








      <textarea

        value={description}

        onChange={(e)=>
          setDescription(e.target.value)
        }

        placeholder="Descripción"

        className="mt-4 w-full rounded-xl border p-3 text-black"

      />









      <div className="mt-4">


        <label className="font-bold text-black">

          Imagen del producto

        </label>





        <input

          type="file"

          accept="image/*"

          onChange={(e)=>

            setImageFile(
              e.target.files?.[0] || null
            )

          }

          className="mt-2 w-full rounded-xl border p-3 text-black"

        />



      </div>









      <button

        disabled={loading}

        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"

      >


        {loading

          ?

          "Guardando..."

          :

          "Guardar producto"


        }



      </button>









      {message && (


        <p className="mt-4 font-bold text-blue-600">


          {message}


        </p>


      )}




    </form>

  );


}