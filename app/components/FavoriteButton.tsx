"use client";

import { useFavoritesStore } from "../../lib/favorites-store";
import type { Product } from "../../data/products";

interface FavoriteButtonProps {
  product: Product;
}

export default function FavoriteButton({
  product,
}: FavoriteButtonProps) {


  const favorites = useFavoritesStore(
    (state) => state.favorites
  );


  const addFavorite = useFavoritesStore(
    (state) => state.addFavorite
  );


  const removeFavorite = useFavoritesStore(
    (state) => state.removeFavorite
  );



  const isFavorite = favorites.some(
    (item) => item.id === product.id
  );



  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {

    e.preventDefault();
    e.stopPropagation();


    if (isFavorite) {

      removeFavorite(product.id);

    } else {

      addFavorite(product);

    }

  };



  return (

    <button

      onClick={handleClick}

      aria-label={
        isFavorite
          ? "Quitar de favoritos"
          : "Agregar a favoritos"
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
            ? "bg-red-50"
            : "bg-white"
        }
      `}

    >

      <span
        className={
          isFavorite
            ? "animate-pulse"
            : ""
        }
      >

        {isFavorite
          ? "❤️"
          : "🤍"}

      </span>


    </button>

  );

}