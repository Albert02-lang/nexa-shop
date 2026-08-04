"use client";


import type { MouseEvent } from "react";


import type { Product } from "../../types/product";


import { useFavoritesStore } from "../../lib/favorites-store";




interface FavoriteButtonProps {

  product: Product;

}





export default function FavoriteButton({

product,

}:FavoriteButtonProps){





const favorites =
useFavoritesStore(
(state)=>state.favorites
);




const addFavorite =
useFavoritesStore(
(state)=>state.addFavorite
);




const removeFavorite =
useFavoritesStore(
(state)=>state.removeFavorite
);







const isFavorite =

product.id !== undefined &&

favorites.some(

(item)=>

item.id === product.id

);







const handleClick = (

e:MouseEvent<HTMLButtonElement>

)=>{


e.preventDefault();

e.stopPropagation();





if(product.id === undefined){

return;

}





if(isFavorite){


removeFavorite(product.id);



}else{


addFavorite(product);



}



};







return (


<button


onClick={handleClick}


aria-label={

isFavorite

?

"Quitar de favoritos"

:

"Agregar a favoritos"

}


className={`

flex

h-12

w-12

items-center

justify-center

rounded-full

text-2xl

shadow-lg

transition

duration-300

hover:scale-110

active:scale-90


${

isFavorite

?

"bg-red-50"

:

"bg-white"

}


`}


>



<span

className={

isFavorite

?

"animate-pulse"

:

""

}

>

{

isFavorite

?

"❤️"

:

"🤍"

}


</span>



</button>


);



}