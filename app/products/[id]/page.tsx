import Image from "next/image";

import { supabaseServer } from "../../../lib/supabase-server";


import ProductStatusClient from "../../components/ProductStatusClient";

import ProductPurchase from "../../components/ProductPurchase";


import type { Product } from "../../../types/product";


export const dynamic = "force-dynamic";


export default async function ProductPage({

params,

}:{

params:Promise<{

id:string

}>

}){



const { id } = await params;

const {
  data,
  error,
} = await supabaseServer
  .from("products")
  .select("*")
  .eq("id", Number(id))
  .single();







console.log(
"Producto Supabase:",
data
);



console.log(
"Error:",
error
);








const product:Product | null = data

?

{

id:data.id,

name:data.name,

price:data.price,

oldPrice:data.oldPrice ?? undefined,

image:data.image,

category:data.category,

type:data.type ?? "Sin tipo",

gender:data.gender ?? "Unisex",

description:data.description ?? "",

size:data.size ?? "Única",

sizes:data.sizes ?? [],

colors:data.colors ?? [],

available:data.available ?? true,

status:data.status ?? "Disponible",

tag:data.tag,

stock:data.stock ?? 1,

}

:

null;









if(!product){


return (

<main className="flex min-h-screen items-center justify-center">


<h1 className="text-3xl font-bold text-black">

Producto no encontrado

</h1>


</main>

);


}









return (


<main className="min-h-screen bg-gray-50 py-28">



<div className="mx-auto max-w-7xl px-6">



<div className="grid gap-10 lg:grid-cols-2">





<div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">



<div className="relative h-[550px]">


<Image

src={

product.image ||

"/images/products/default.jpg"

}

alt={product.name}

fill

sizes="(max-width:768px)100vw,50vw"

className="object-cover"

/>



</div>






<div className="absolute right-6 top-6">


<ProductStatusClient

productId={product.id!}

/>


</div>





</div>










<div className="rounded-3xl bg-white p-8 shadow-xl">





<p className="text-sm font-bold uppercase text-blue-600">


{product.gender}

·

{product.category}


</p>








<h1 className="mt-3 text-5xl font-black text-black">


{product.name}


</h1>








<p className="mt-6 text-4xl font-black text-black">


${product.price}

<span className="ml-2 text-lg text-gray-500">

MXN

</span>


</p>









<p className="mt-6 leading-7 text-gray-700">


{product.description}


</p>








<div className="mt-8 rounded-2xl bg-gray-50 p-5">


<h3 className="font-bold text-black">

Características

</h3>



<p className="mt-3">

👕 Talla:

<span className="ml-2 font-bold">

{product.size}

</span>

</p>




<p className="mt-3">

🎨 Color:

<span className="ml-2 font-bold">

{product.colors?.[0] ?? "Variado"}

</span>

</p>



</div>









<div className="mt-10">


<ProductPurchase

product={product}

/>


</div>





</div>





</div>




</div>



</main>


);


}