import type { Product } from "../../../types/product";


export interface AdminProductCardProps {

  product: Product;

  onStatusChange: (
    id: number,
    status: "Disponible" | "En trato" | "Vendido"
  ) => void;


  onEdit: (
    product: Product
  ) => void;


  onDelete: (
    id: number
  ) => void;

}