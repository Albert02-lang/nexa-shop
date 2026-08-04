"use client";


import Image from "next/image";


import type { Product } from "../../types/product";



interface AdminProductCardProps {


  product: Product;


  onStatusChange:
  (
    id:number,
    status:
    | "Disponible"
    | "En trato"
    | "Vendido"
  )=>void;



  onEdit:
  (
    product:Product
  )=>void;



  onDelete:
  (
    id:number
  )=>void;



}





export default function AdminProductCard({


product,

onStatusChange,

onEdit,

onDelete,


}:AdminProductCardProps){



const handleStatusChange = (

status:
"Disponible"
|
"En trato"
|
"Vendido"

)=>{


if(product.id === undefined){

return;

}


onStatusChange(

product.id,

status

);



};







const handleDelete = ()=>{


if(product.id === undefined){

return;

}


onDelete(product.id);



};







return (

<div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">



<div className="relative h-72">



<Image

src={
product.image &&
product.image.trim() !== ""

?

product.image

:

"/images/products/default.jpg"

}

alt={product.name}

fill

sizes="(max-width:768px) 100vw, 33vw"

className="object-cover"

/>





<span

className={`absolute right-4 top-4 rounded-full px-4 py-2 text-sm font-bold text-white ${
product.status === "Disponible"

?

"bg-green-600"

:

product.status === "En trato"

?

"bg-yellow-500"

:

"bg-red-600"

}`}

>


{product.status}


</span>



</div>







<div className="p-6">



<div className="mb-4 flex justify-between">


<span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">

{product.category}

</span>




{product.type && (

<span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">

{product.type}

</span>

)}


</div>






<h2 className="text-2xl font-black text-black">

{product.name}

</h2>





<p className="mt-3 text-3xl font-black text-blue-600">

${product.price} MXN

</p>






<div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">


<p>

👕 Talla:

<span className="ml-2 font-bold text-black">

{product.size || "Única"}

</span>

</p>


</div>








<div className="mt-6">


<label className="mb-2 block text-sm font-semibold text-gray-600">

Estado del producto

</label>




<select

value={product.status}

onChange={(e)=>

handleStatusChange(

e.target.value as

"Disponible"
|
"En trato"
|
"Vendido"

)

}

className="w-full rounded-xl border p-3 font-semibold text-black"

>



<option value="Disponible">

🟢 Disponible

</option>



<option value="En trato">

🟡 En trato

</option>



<option value="Vendido">

🔴 Vendido

</option>



</select>


</div>








<div className="mt-6 grid grid-cols-2 gap-3">



<button

onClick={()=>

onEdit(product)

}

className="rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"

>

✏️ Editar

</button>






<button

onClick={handleDelete}

className="rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700"

>

🗑️ Eliminar

</button>





</div>





</div>





</div>


);


}