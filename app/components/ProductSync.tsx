"use client";

import { useEffect } from "react";

import { useProductStore } from "../../lib/product-store";



export default function ProductSync() {


  const loadProducts =
    useProductStore(
      (state)=>state.loadProducts
    );



  useEffect(()=>{


    // Carga inicial al abrir la tienda
    loadProducts();



    const syncProducts = async()=>{


      await loadProducts();


    };



    window.addEventListener(

      "product-status-change",

      syncProducts

    );



    return()=>{


      window.removeEventListener(

        "product-status-change",

        syncProducts

      );


    };


  },[loadProducts]);



  return null;

}