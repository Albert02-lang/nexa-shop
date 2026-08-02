"use client";

import { useEffect, useState } from "react";

import type { Product } from "../../data/products";

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
      (state) => state.updateProduct
    );



  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState(0);

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState("");

  const [tag, setTag] =
    useState("");



  useEffect(() => {


    if (!product) return;



    setName(product.name);

    setPrice(product.price);

    setCategory(product.category);

    setDescription(product.description);

    setImage(product.image);

    setTag(product.tag ?? "");



  }, [product]);




  if (!product) {

    return null;

  }




  const handleSave = async () => {



    await updateProduct(

      product.id,

      {


        name,

        price,

        category,

        description,

        image,

        tag,

      }


    );



    onClose();


  };





  return (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">


<div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">


<h2 className="mb-6 text-3xl font-black text-black">
Editar producto
</h2>




<div className="space-y-5">


<div>

<label className="mb-2 block font-semibold text-black">
Nombre
</label>


<input

value={name}

onChange={(e)=>
setName(e.target.value)
}

className="w-full rounded-xl border p-3 text-black"

/>

</div>




<div>

<label className="mb-2 block font-semibold text-black">
Precio
</label>


<input

type="number"

value={price}

onChange={(e)=>
setPrice(
Number(e.target.value)
)
}

className="w-full rounded-xl border p-3 text-black"

/>

</div>




<div>

<label className="mb-2 block font-semibold text-black">
Categoría
</label>


<input

value={category}

onChange={(e)=>
setCategory(e.target.value)
}

className="w-full rounded-xl border p-3 text-black"

/>

</div>




<div>

<label className="mb-2 block font-semibold text-black">
Descripción
</label>


<textarea

value={description}

onChange={(e)=>
setDescription(e.target.value)
}

className="w-full rounded-xl border p-3 text-black"

/>

</div>




<div>

<label className="mb-2 block font-semibold text-black">
URL de imagen
</label>


<input

value={image}

onChange={(e)=>
setImage(e.target.value)
}

className="w-full rounded-xl border p-3 text-black"

/>

</div>




<div>

<label className="mb-2 block font-semibold text-black">
Etiqueta
</label>


<input

value={tag}

onChange={(e)=>
setTag(e.target.value)
}

placeholder="Nuevo, Oferta, Exclusivo"

className="w-full rounded-xl border p-3 text-black"

/>

</div>



</div>





<div className="mt-8 flex justify-end gap-4">


<button

onClick={onClose}

className="rounded-xl bg-gray-500 px-6 py-3 font-bold text-white"

>

Cancelar

</button>



<button

onClick={handleSave}

className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"

>

Guardar cambios

</button>



</div>



</div>


</div>

);


}