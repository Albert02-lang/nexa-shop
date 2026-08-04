"use client";


import { create } from "zustand";

import { persist } from "zustand/middleware";

import type { Product } from "../types/product";



interface FavoriteProduct extends Product {

  id:number;

}



interface FavoritesStore {


  favorites: FavoriteProduct[];


  addFavorite:
    (
      product: Product
    ) => void;


  removeFavorite:
    (
      id:number
    ) => void;


  isFavorite:
    (
      id:number
    ) => boolean;


}




export const useFavoritesStore =
create<FavoritesStore>()(



persist(


(set,get)=>({



favorites: [],




addFavorite:(product)=>{


if(product.id === undefined){

  return;

}



set((state)=>{



const exists =
state.favorites.some(

(item)=>

item.id === product.id

);



if(exists){


return {

favorites:
state.favorites

};


}




return {


favorites:[

...state.favorites,

product as FavoriteProduct

]


};



});



},






removeFavorite:(id)=>


set((state)=>({


favorites:

state.favorites.filter(

(item)=>

item.id !== id

)


})),








isFavorite:(id)=>


get()
.favorites
.some(

(item)=>

item.id === id

),




}),



{


name:
"nexa-shop-favorites"


}



)


);