import type { Product } from "../../../data/products";

export interface AdminProductCardProps {
  product: Product;
  currentStatus: "Disponible" | "En trato" | "Vendido";

  onStatusChange: (
    id: number,
    status: "Disponible" | "En trato" | "Vendido"
  ) => void;

  onEdit: (product: Product) => void;

  onDelete: (id: number) => void;
}