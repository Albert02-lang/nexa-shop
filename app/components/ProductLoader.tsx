"use client";

import { useEffect } from "react";
import { useProductStore } from "../../lib/product-store";


export default function ProductLoader() {

  const loadProducts =
    useProductStore(
      (state) => state.loadProducts
    );


  useEffect(() => {

    loadProducts();

  }, [loadProducts]);


  return null;
}