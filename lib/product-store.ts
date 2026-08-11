"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getSupabaseClient } from "./supabase-client";
import type {
  Product,
  NewProduct,
} from "../types/product";


interface ProductStore {

  productsAdded: Product[];

  productStatus: Record<
    number,
    "Disponible" | "En trato" | "Vendido"
  >;


  loadProducts: () => Promise<void>;


  addProduct: (
    product: NewProduct
  ) => Promise<void>;


  updateProduct: (
    product: Product
  ) => Promise<void>;


  updateStatus: (
    id: number,
    status:
      | "Disponible"
      | "En trato"
      | "Vendido"
  ) => Promise<void>;


  deleteProduct: (
    id: number
  ) => Promise<void>;

}




function mapProduct(
  item: any
): Product {

  return {

    id: item.id,

    name:
      item.name ?? "",

    price:
      Number(item.price ?? 0),

    oldPrice:
      item.old_price ??
      item.oldPrice ??
      undefined,

    image:
      item.image ?? "",

    category:
      item.category ?? "",

    type:
      item.type ?? "",

    gender:
      item.gender ?? "",

    description:
      item.description ?? "",

    size:
      item.size ?? undefined,

    sizes:
      item.sizes ?? [],

    colors:
      Array.isArray(item.colors)
        ? item.colors
        : [],

    available:
      item.available ?? true,

    status:
      item.status ??
      "Disponible",

    tag:
      item.tag ?? undefined,

    stock:
      item.stock ?? undefined,

  };

}





export const useProductStore =
create<ProductStore>()(

persist(

(set, get) => ({


productsAdded: [],


productStatus: {},




loadProducts:
async () => {


  const supabase =
    getSupabaseClient();
if (!supabase) {
return;
}



const {
data,
error,
}
=
await supabase
.from("products")
.select("*")
.order(
"id",
{
ascending:false
}
);



if (error) {
  console.error(
    "Error cargando productos:",
    error.message,
    error.details,
    error.hint,
    error.code
  );
  return;
}


const products =
(data ?? [])
.map(mapProduct);



set({

productsAdded:
products,


productStatus:
products.reduce(

(acc,product)=>{

acc[product.id]=product.status;

return acc;

},

{} as Record<
number,
"Disponible" |
"En trato" |
"Vendido"
>

)

});


},





addProduct:
async (
product: NewProduct
) => {

const supabase =
    getSupabaseClient();

if(!supabase){
return;
}




const {
data,
error
}
=
await supabase
.from("products")
.insert({

name:
product.name,

price:
product.price,

image:
product.image,

category:
product.category,

type:
product.type,

gender:
product.gender,

description:
product.description,

size:
product.size,


available:
product.available,

status:
product.status,

tag:
product.tag,

stock:
product.stock,

})
.select()
.single();




if(error){

console.error(
 "Error agregando producto:",
 JSON.stringify(error, null, 2)
);

return;

}




const newProduct =
mapProduct(data);




set((state)=>({

productsAdded:[
newProduct,
...state.productsAdded
],


productStatus:{
...state.productStatus,

[newProduct.id]:
newProduct.status

}

}));



},






updateProduct:
async(
product: Product
)=>{

const supabase =
    getSupabaseClient();

if(!supabase){
return;
}



const {
error
}
=
await supabase
.from("products")
.update({

name:
product.name,

price:
product.price,

image:
product.image,

category:
product.category,

type:
product.type,

gender:
product.gender,

description:
product.description,

size:
product.size,

colors:
product.colors,

available:
product.available,

status:
product.status,

tag:
product.tag,

stock:
product.stock,

})
.eq(
"id",
product.id
);



if(error){

console.error(
"Error actualizando producto:",
error
);

return;

}




set((state)=>({

productsAdded:
state.productsAdded.map(

(item)=>

item.id === product.id
?
product
:
item

),


productStatus:{
...state.productStatus,

[product.id]:
product.status

}

}));



},






updateStatus:
async(
id,
status
)=>{

const supabase =
    getSupabaseClient();
if(!supabase){
return;
}



const {
error
}
=
await supabase
.from("products")
.update({

status,

available:
status !== "Vendido"

})
.eq(
"id",
id
);



if(error){

console.error(
"Error actualizando estado:",
error
);

return;

}



set((state)=>({

productsAdded:
state.productsAdded.map(

(product)=>

product.id===id

?

{

...product,

status,

available:
status !== "Vendido"

}

:

product

),



productStatus:{
...state.productStatus,

[id]:
status

}

}));



},







deleteProduct:
async(
id
)=>{

const supabase =
    getSupabaseClient();
    
if(!supabase){
return;
}



const {
error
}
=
await supabase
.from("products")
.delete()
.eq(
"id",
id
);



if(error){

console.error(
"Error eliminando producto:",
error
);

return;

}



set((state)=>({

productsAdded:
state.productsAdded.filter(

(product)=>
product.id !== id

),


productStatus:
Object.fromEntries(

Object.entries(
state.productStatus
)
.filter(
([key])=>
Number(key)!==id
)

)


}));



}





}),


{

name:
"nexa-products-storage"

}


)

);