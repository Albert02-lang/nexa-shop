
import type { Product } from "../types/product";


export const products: Product[] = [

  {
    id: 1,

    name: "Playera Oversize Negra",

    price: 399,

    oldPrice: 499,

    image:
      "/images/products/playera-negra.jpg",

    category: "Hombre",

    type: "Playera",

    gender: "Hombre",

    description:
      "Playera oversize de algodón premium. Pieza única disponible.",

    size: "M",

    colors: [
      "Negro"
    ],

    available: true,

    status:
      "Disponible",

    tag:
      "⭐ Pieza única",

  },


  {
    id: 2,

    name:
      "Sudadera Beige",

    price:
      699,

    oldPrice:
      899,

    image:
      "/images/products/sudadera-beige.jpg",

    category:
      "Mujer",

    type:
      "Sudadera",

    gender:
      "Mujer",

    description:
      "Sudadera cómoda para uso diario. Una sola existencia disponible.",

    size:
      "L",

    colors:
      [
        "Beige"
      ],

    available:
      true,

    status:
      "Disponible",

    tag:
      "🆕 Pieza única",

  },


  {
    id: 3,

    name:
      "Jeans Azul",

    price:
      799,

    oldPrice:
      999,

    image:
      "/images/products/jeans-azul.jpg",

    category:
      "Niños",

    type:
      "Jeans",

    gender:
      "Niños",

    description:
      "Jeans corte recto de mezclilla. Producto exclusivo de una sola pieza.",

    size:
      "32",

    colors:
      [
        "Azul"
      ],

    available:
      true,

    status:
      "Disponible",

    tag:
      "🔥 Exclusivo",

  },

];

