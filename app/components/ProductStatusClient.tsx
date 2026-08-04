"use client";


import { useProductStore } from "../../lib/product-store";



interface ProductStatusClientProps {

  productId:number;

}





export default function ProductStatusClient({

productId,

}:ProductStatusClientProps){



const products =
useProductStore(
(state)=>state.productsAdded
);




const product =
products.find(

(item)=>

item.id === productId

);




const status =
product?.status ?? "Disponible";





return (


<span

className={`

rounded-full

px-4

py-2

text-sm

font-bold

text-white


${

status === "Disponible"

?

"bg-green-600"

:

status === "En trato"

?

"bg-yellow-500"

:

"bg-red-600"

}

`}

>


{status}


</span>


);



}