"use client";


import { create } from "zustand";

import { persist } from "zustand/middleware";

import type { Product } from "../types/product";



interface CartItem extends Product {

  id: number;

  quantity: number;

}



interface CartStore {


  items: CartItem[];


  addItem:
    (
      product: Product
    ) => void;


  removeItem:
    (
      id:number
    ) => void;


  increaseQuantity:
    (
      id:number
    ) => void;


  decreaseQuantity:
    (
      id:number
    ) => void;


  clearCart:
    () => void;


}



export const useCartStore =
create<CartStore>()(


persist(


(set)=>({


items: [],



addItem:(product)=>{


if(product.id === undefined){

 return;

}



set((state)=>{


const exists =
state.items.find(
(item)=>
item.id === product.id
);



if(exists){


return {


items:

state.items.map(
(item)=>

item.id === product.id

?

{

...item,

quantity:
item.quantity + 1

}

:

item

)


};



}



return {


items:[

...state.items,


{

...product,

id:product.id,

quantity:1

}

]


};



});


},




removeItem:(id)=>


set((state)=>({


items:

state.items.filter(

(item)=>
item.id !== id

)


})),





increaseQuantity:(id)=>


set((state)=>({


items:

state.items.map(

(item)=>

item.id === id

?

{

...item,

quantity:
item.quantity + 1

}

:

item


)


})),






decreaseQuantity:(id)=>


set((state)=>({


items:

state.items.map(

(item)=>

item.id === id &&
item.quantity > 1

?

{

...item,

quantity:
item.quantity - 1

}

:

item


)


})),





clearCart:()=>


set({

items:[]

}),



}),



{

name:"nexa-shop-cart"

}



)


);