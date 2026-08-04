"use client";


import { useMemo, useState } from "react";

import Link from "next/link";

import Image from "next/image";


import type { Product } from "../../types/product";


import { useCartStore } from "../../lib/cart-store";

import { useProductStore } from "../../lib/product-store";


import ProductSearch from "./ProductSearch";

import ProductFilters from "./ProductFilters";

import FavoriteButton from "./FavoriteButton";





export default function FeaturedProducts(){



const whatsappNumber =
"525535059049";





const addItem =
useCartStore(
(state)=>state.addItem
);




const cartItems =
useCartStore(
(state)=>state.items
);




const productsAdded =
useProductStore(
(state)=>state.productsAdded
);




const updateStatus =
useProductStore(
(state)=>state.updateStatus
);






const [search,setSearch] =
useState("");



const [category,setCategory] =
useState("Todos");



const [sort,setSort] =
useState("default");






const isInCart = (id:number)=>{


return cartItems.some(

(item)=>

item.id===id

);


};








const filteredProducts =
useMemo<Product[]>(()=>{


let list=[...productsAdded];




if(category !== "Todos"){


list =
list.filter(

(product)=>

product.category===category

);


}





if(search.trim() !== ""){


const text =
search.toLowerCase();



list =
list.filter(

(product)=>

product.name
.toLowerCase()
.includes(text)

||

product.category
.toLowerCase()
.includes(text)

||

product.description
.toLowerCase()
.includes(text)

);



}





switch(sort){



case "price-asc":

list.sort(

(a,b)=>

a.price-b.price

);

break;




case "price-desc":

list.sort(

(a,b)=>

b.price-a.price

);

break;




case "name":

list.sort(

(a,b)=>

a.name.localeCompare(
b.name
)

);

break;



}



return list;



},[
productsAdded,
category,
search,
sort
]);









return (

<section
id="productos"
className="bg-gray-50 py-16"
>



<div className="mx-auto max-w-7xl px-4">






<div className="mb-10 text-center">


<h2 className="text-4xl font-black text-black">

Productos Destacados

</h2>


<p className="mt-3 text-gray-600">

Encuentra prendas seleccionadas para tu estilo.

</p>


</div>







<div className="space-y-6">


<ProductSearch

search={search}

setSearch={setSearch}

/>



<ProductFilters

category={category}

setCategory={setCategory}

sort={sort}

setSort={setSort}

/>


</div>









<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">





{filteredProducts.map((product)=>{



const status =
product.status ?? "Disponible";



const reserved =
product.id !== undefined &&
isInCart(product.id);







const handleReserve =
async()=>{


if(

product.id === undefined ||

reserved ||

status !== "Disponible"

){

return;

}




addItem(product);




await updateStatus(

product.id,

"En trato"

);



};






return (



<div

key={product.id}

className="overflow-hidden rounded-3xl bg-white shadow-md"

>





<Link href={`/products/${product.id}`}>



<div className="relative aspect-[4/5]">



<Image

src={
product.image ||
"/images/products/default.jpg"

}

alt={product.name}

fill

sizes="(max-width:768px)100vw,25vw"

className="object-cover"

/>



<div className="absolute left-3 top-3">

<FavoriteButton

product={product}

/>

</div>





</div>





<div className="p-5">



<p className="text-sm font-bold text-blue-600">

{product.category}

</p>



<h3 className="text-xl font-black text-black">

{product.name}

</h3>



<p className="mt-3 text-2xl font-black">

${product.price} MXN

</p>



</div>



</Link>








<div className="space-y-3 p-5">



<button

onClick={handleReserve}

disabled={
reserved ||
status !== "Disponible"
}

className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white"

>


{

status === "En trato"

?

"🟡 Producto en trato"

:

status === "Vendido"

?

"🔴 Producto vendido"

:

reserved

?

"✅ Producto en carrito"

:

"🛒 Agregar al carrito"

}



</button>








<a

href={`https://wa.me/${whatsappNumber}?text=Hola Nexa Shop, me interesa ${product.name}`}

target="_blank"

rel="noopener noreferrer"

className="block rounded-xl bg-black py-3 text-center font-bold text-white"

>

💬 WhatsApp

</a>



</div>





</div>


);


})}





</div>





</div>



</section>


);



}