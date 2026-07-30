export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  type: string;
  gender: string;
  description: string;
  size?: string;
  sizes: string[];
  colors: string[];
  available: boolean;
  status: "Disponible" | "En trato" | "Vendido";
  tag?: string;
}


export const products: Product[] = [

  {
    id: 1,
    name: "Playera Oversize Negra",
    price: 399,
    oldPrice: 499,
    image: "/images/products/playera-negra.jpg",
    category: "Hombre",
    type: "Playera",
    gender: "Hombre",
    description:
      "Playera oversize de algodón premium. Pieza única disponible.",
    sizes: ["M"],
    colors: ["Negro"],
    available: true,
    status: "Disponible",
    tag: "⭐ Pieza única",
  },


  {
    id: 2,
    name: "Sudadera Beige",
    price: 699,
    oldPrice: 899,
    image: "/images/products/sudadera-beige.jpg",
    category: "Mujer",
    type: "Sudadera",
    gender: "Mujer",
    description:
      "Sudadera cómoda para uso diario. Una sola existencia disponible.",
    sizes: ["L"],
    colors: ["Beige"],
    available: true,
    status: "Disponible",
    tag: "🆕 Pieza única",
  },


  {
    id: 3,
    name: "Jeans Azul",
    price: 799,
    oldPrice: 999,
    image: "/images/products/jeans-azul.jpg",
    category: "Niños",
    type: "Jeans",
    gender: "Niños",
    description:
      "Jeans corte recto de mezclilla. Producto exclusivo de una sola pieza.",
    sizes: ["32"],
    colors: ["Azul"],
    available: true,
    status: "Disponible",
    tag: "🔥 Exclusivo",
  },


];


console.log("products cargado");