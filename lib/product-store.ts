import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Product } from "../data/products";
import { supabase } from "./supabase";


interface ProductStore {

  productStatus: Record<
    number,
    "Disponible" | "En trato" | "Vendido"
  >;

  productsAdded: Product[];


  updateStatus: (
    id: number,
    status: "Disponible" | "En trato" | "Vendido"
  ) => Promise<void>;


  addProduct: (
    product: Product
  ) => void;


  updateProduct: (
    product: Product
  ) => void;


  deleteProduct: (
    id: number
  ) => void;


  loadProducts: () => Promise<void>;


  syncStorage: () => void;

}



export const useProductStore =
  create<ProductStore>()(
    persist(

      (set) => ({

        productStatus: {},

        productsAdded: [],



        loadProducts: async () => {


          const { data, error } =
            await supabase
              .from("products")
              .select("*")
              .order("id", {
                ascending: false,
              });


if (error) {

  console.error(
    "Error cargando productos:",
    error
  );

  return;

}

if (data) {

  set({

    productsAdded:
      data.map((product) => ({

        ...product,

        status:
          product.status ??
          "Disponible",

      })),

    productStatus:
      Object.fromEntries(

        data.map((product) => [

          product.id,

          product.status ??
          "Disponible",

        ])

      ),

  });

}

},




        updateStatus: async (
          id,
          status
        ) => {


          const { error } =
            await supabase
              .from("products")
              .update({
                status,
              })
              .eq("id", id);



          if (error) {

            console.error(
              "Error actualizando estado:",
              error
            );

            return;

          }



          set((state) => ({

            productStatus: {

              ...state.productStatus,

              [id]: status,

            },


            productsAdded:

              state.productsAdded.map(
                (product) =>

                  product.id === id

                    ? {
                        ...product,
                        status,
                      }

                    : product

              ),

          }));




          if (
            typeof window !== "undefined"
          ) {

            window.dispatchEvent(
              new Event(
                "product-status-change"
              )
            );

          }


        },






        addProduct: (
          product
        ) => {


          set((state) => ({

            productsAdded: [

              product,

              ...state.productsAdded,

            ],


            productStatus: {

              ...state.productStatus,

              [product.id]:
                product.status ??
                "Disponible",

            },

          }));


        },






        updateProduct: (
          product
        ) => {


          set((state) => ({

            productsAdded:

              state.productsAdded.map(

                (item) =>

                  item.id === product.id

                    ? product

                    : item

              ),


          }));


        },






        deleteProduct: (
          id
        ) => {


          set((state) => ({

            productsAdded:

              state.productsAdded.filter(

                (product) =>

                  product.id !== id

              ),


          }));




          if (
            typeof window !== "undefined"
          ) {


            localStorage.setItem(
              "nexa-shop-refresh",
              Date.now().toString()
            );



            window.dispatchEvent(
              new Event(
                "product-status-change"
              )
            );


          }


        },






        syncStorage: () => {


          if (
            typeof window === "undefined"
          ) {

            return;

          }




          const saved =
            localStorage.getItem(
              "nexa-shop-products"
            );




          if (saved) {


            try {


              const data =
                JSON.parse(saved);



              set({

                productStatus:

                  data.state?.productStatus ??
                  {},



                productsAdded:

                  data.state?.productsAdded ??
                  [],


              });



            } catch (error) {


              console.error(
                "Error sincronizando productos",
                error
              );


            }


          }


        },




      }),



      {


        name:
          "nexa-shop-products",



        onRehydrateStorage:
          () => {


            return () => {


              if (
                typeof window !== "undefined"
              ) {


                window.dispatchEvent(

                  new Event(
                    "product-status-change"
                  )

                );


              }


            };


          },


      }


    )

  );