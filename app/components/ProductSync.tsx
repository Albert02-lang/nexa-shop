"use client";

import { useEffect } from "react";
import { useProductStore } from "../../lib/product-store";


export default function ProductSync() {

  useEffect(() => {

    const sync = () => {

      useProductStore.persist.rehydrate();

    };


    window.addEventListener(
      "storage",
      sync
    );


    return () => {

      window.removeEventListener(
        "storage",
        sync
      );

    };


  }, []);


  return null;

}