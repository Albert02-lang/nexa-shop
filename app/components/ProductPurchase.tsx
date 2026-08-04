"use client";


import { useProductStore } from "../../lib/product-store";


import AddToCartButton from "./AddToCartButton";


import type { Product } from "../../types/product";




interface ProductPurchaseProps {

product:Product;

}





export default function ProductPurchase({

product,

}:ProductPurchaseProps){



const productsAdded =
useProductStore(
(state)=>state.productsAdded
);





const currentProduct =

productsAdded.find(

(item)=>

item.id === product.id

)

??

product;





const status =
currentProduct.status;





const whatsappNumber =
"525535059049";







if(status==="Vendido"){


return (

<div className="rounded-xl bg-red-100 p-5 text-center font-bold text-red-700">

🔴 Producto vendido

</div>

);


}







if(status==="En trato"){


return (

<div className="rounded-xl bg-yellow-100 p-5 text-center font-bold text-yellow-700">

🟡 Producto en trato.

<br/>

Consulta disponibilidad.

</div>

);


}







return (

<div className="space-y-4">


<AddToCartButton

product={currentProduct}

/>





<a

href={`https://wa.me/${whatsappNumber}?text=Hola Nexa Shop, me interesa ${currentProduct.name}`}

target="_blank"

rel="noopener noreferrer"

className="block rounded-xl bg-green-600 py-4 text-center font-bold text-white hover:bg-green-700"

>


💬 Pedir por WhatsApp


</a>



</div>

);



}