import { create } from "zustand";

import type { Product } from "../data/products";

import { supabase } from "./supabase";


interface ProductStore {

  productsAdded: Product[];

  productStatus: Record<
    number,
    "Disponible" | "En trato" | "Vendido"
  >;

  loadProducts: () => Promise<void>;

  updateStatus: (
    id:number,
    status:
      | "Disponible"
      | "En trato"
      | "Vendido"
  ) => Promise<void>;

  addProduct: (
    product:Product
  ) => Promise<void>;

  updateProduct: (
    id:number,
    product:Partial<Product>
  ) => Promise<void>;

  deleteProduct: (
    id:number
  ) => Promise<void>;

}



function mapProduct(item:any):Product {

  return {

    id:item.id,

    name:item.name ?? "",

    price:item.price ?? 0,

    oldPrice:item.oldPrice ?? undefined,

    image:item.image ?? "",

    category:item.category ?? "",

    type:item.type ?? "",

    gender:item.gender ?? "",

    description:item.description ?? "",

    size:item.size ?? "",

    sizes:item.sizes ?? [],

    colors:item.colors ?? [],

    available:item.available ?? true,

    status:item.status ?? "Disponible",

    tag:item.tag ?? undefined,

    stock:item.stock ?? undefined,

  };

}




export const useProductStore =
create<ProductStore>((set)=>({


productsAdded:[],


productStatus:{},




loadProducts:async()=>{


const {
data,
error
}=await supabase
.from("products")
.select("*")
.order("id",{ascending:false});



if(error){

console.error(
"Error cargando productos:",
error
);

return;

}



const products =
(data ?? []).map(mapProduct);



const statusMap =
products.reduce(
(acc,product)=>{

acc[product.id]=product.status;

return acc;

},
{} as Record<
number,
"Disponible"|"En trato"|"Vendido"
>
);



set({

productsAdded:products,

productStatus:statusMap

});


},





updateStatus: async (
  id,
  status
) => {

  console.log(
    "ACTUALIZANDO ESTADO:",
    {
      id,
      status,
    }
  );


  const {
    data,
    error,
  } = await supabase
    .from("products")
    .update({
      status,
      available: status === "Disponible",
    })
    .eq("id", id)
    .select("*");



  console.log(
    "RESPUESTA UPDATE:",
    data
  );


  console.log(
    "ERROR UPDATE:",
    error
  );



  if(error){

    console.error(
      "Error actualizando estado:",
      error
    );

    return;

  }



  if(!data || data.length === 0){

    console.error(
      "No encontró producto con ID:",
      id
    );

    return;

  }



  await useProductStore
    .getState()
    .loadProducts();



  if(typeof window !== "undefined"){

    window.dispatchEvent(
      new Event(
        "product-status-change"
      )
    );

  }


},



addProduct:async(product)=>{


const {
data,
error
}=await supabase
.from("products")
.insert({

name:product.name,

price:product.price,

image:product.image,

category:product.category,

type:product.type,

gender:product.gender,

description:product.description,

sizes:product.sizes,

colors:product.colors,

available:product.available,

status:product.status,

tag:product.tag

})
.select()
.single();



if(error){

console.error(
"Error agregando:",
error
);

return;

}



if(data){

set((state)=>({

productsAdded:[
mapProduct(data),
...state.productsAdded
]


}));

}


},






updateProduct:async(
id,
product
)=>{


const {
error
}=await supabase
.from("products")
.update(product)
.eq(
"id",
id
);



if(error){

console.error(
"Error actualizando:",
error
);

return;

}



await useProductStore
.getState()
.loadProducts();


},






deleteProduct:async(id)=>{


const {
error
}=await supabase
.from("products")
.delete()
.eq(
"id",
id
);



if(error){

console.error(
"Error eliminando:",
error
);

return;

}



set((state)=>({

productsAdded:
state.productsAdded.filter(
(product)=>
product.id!==id
)

}));



}



}));