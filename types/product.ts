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

  sizes?: string[];

  colors: string[];

  available: boolean;

  status:
    | "Disponible"
    | "En trato"
    | "Vendido";

  tag?: string;

  stock?: number;

}
export type NewProduct = Omit<Product, "id">;