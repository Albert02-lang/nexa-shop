
"use client";


import {
  useEffect,
  useState,
} from "react";


import type { Product } from "../../types/product";


import { useProductStore } from "../../lib/product-store";





interface EditProductModalProps {

  product: Product | null;

  onClose: () => void;

}





export default function EditProductModal({

  product,

  onClose,

}: EditProductModalProps) {




  const updateProduct =

    useProductStore(

      (state) =>
        state.updateProduct

    );





  const [name,setName] =
    useState("");



  const [price,setPrice] =
    useState(0);



  const [category,setCategory] =
    useState("");



  const [type,setType] =
    useState("");



  const [gender,setGender] =
    useState("");



  const [size,setSize] =
    useState("");



  const [description,setDescription] =
    useState("");



  const [image,setImage] =
    useState("");



  const [tag,setTag] =
    useState("");



  const [colors,setColors] =
    useState("");



  const [stock,setStock] =
    useState(1);



  const [status,setStatus] =

    useState<
      "Disponible"
      |
      "En trato"
      |
      "Vendido"
    >(
      "Disponible"
    );






  useEffect(()=>{


    if(!product) return;



    setName(product.name);


    setPrice(product.price);


    setCategory(product.category);


    setType(product.type);


    setGender(product.gender);


    setSize(product.size ?? "");


    setDescription(product.description);


    setImage(product.image);


    setTag(product.tag ?? "");


    setColors(

      product.colors?.join(", ")
      ??
      ""

    );


    setStock(

      product.stock ?? 1

    );


    setStatus(

      product.status

    );



  },[product]);







  if(!product){

    return null;

  }







  const handleSave = async()=>{


    await updateProduct({

      ...product,


      name,


      price,


      category,


      type,


      gender,


      size,


      description,


      image,


      tag,


      colors:

        colors

        ?

        colors
          .split(",")
          .map(
            (color)=>
              color.trim()
          )

        :

        [],



      stock,


      status,


      available:

        status !== "Vendido",


    });



    onClose();


  };
  
  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        overflow-y-auto
      "
    >


      <div
        className="
          w-full
          max-w-xl
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          bg-white
          p-8
          shadow-2xl
        "
      >


        <h2 className="mb-6 text-3xl font-black text-black">

          Editar producto

        </h2>





        <div className="space-y-5">





          <input

            value={name}

            onChange={(e)=>
              setName(e.target.value)
            }

            placeholder="Nombre"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <input

            type="number"

            value={price}

            onChange={(e)=>
              setPrice(
                Number(e.target.value)
              )
            }

            placeholder="Precio"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <input

            value={category}

            onChange={(e)=>
              setCategory(e.target.value)
            }

            placeholder="Categoría"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <input

            value={type}

            onChange={(e)=>
              setType(e.target.value)
            }

            placeholder="Tipo"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <input

            value={gender}

            onChange={(e)=>
              setGender(e.target.value)
            }

            placeholder="Género"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <input

            value={size}

            onChange={(e)=>
              setSize(e.target.value)
            }

            placeholder="Talla"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <textarea

            value={description}

            onChange={(e)=>
              setDescription(
                e.target.value
              )
            }

            placeholder="Descripción"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <input

            value={image}

            onChange={(e)=>
              setImage(e.target.value)
            }

            placeholder="URL imagen"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <input

            value={tag}

            onChange={(e)=>
              setTag(e.target.value)
            }

            placeholder="Etiqueta"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <input

            value={colors}

            onChange={(e)=>
              setColors(e.target.value)
            }

            placeholder="Colores separados por coma"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <input

            type="number"

            value={stock}

            onChange={(e)=>
              setStock(
                Number(e.target.value)
              )
            }

            placeholder="Stock"

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          />





          <select

            value={status}

            onChange={(e)=>

              setStatus(
                e.target.value as
                | "Disponible"
                | "En trato"
                | "Vendido"
              )

            }

            className="
              w-full
              rounded-xl
              border
              p-3
              text-black
            "

          >


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





        </div>







        <div className="mt-8 flex justify-end gap-4">



          <button

            onClick={onClose}

            className="
              rounded-xl
              bg-gray-500
              px-6
              py-3
              font-bold
              text-white
            "

          >

            Cancelar

          </button>





          <button

            onClick={handleSave}

            className="
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-bold
              text-white
            "

          >

            Guardar cambios

          </button>



        </div>




      </div>


    </div>

  );


}

