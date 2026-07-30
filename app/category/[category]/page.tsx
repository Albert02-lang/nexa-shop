import Image from "next/image";
import Link from "next/link";

import { products } from "../../../data/products";
import ProductStatus from "../../components/ProductStatus";


export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    category: string;
  }>;
}) {

  const { category } = await params;

  const categoryName = decodeURIComponent(
    category
  );



  const categoryProducts = products.filter(
    (product) =>
      product.gender === categoryName
  );



  return (

    <main className="min-h-screen bg-gray-50 py-28">


      <div className="mx-auto max-w-7xl px-6">



        <div className="mb-14 text-center">


          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Colección Nexa Shop
          </p>



          <h1 className="mt-3 text-5xl font-black text-black">
            {categoryName}
          </h1>



          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Descubre nuestra selección de prendas
            pensadas para tu estilo.
          </p>


        </div>





        {categoryProducts.length === 0 ? (


          <div className="rounded-3xl bg-white p-10 text-center shadow">


            <h2 className="text-2xl font-bold text-black">
              Próximamente más productos
            </h2>


            <p className="mt-3 text-gray-600">
              Estamos preparando nuevas prendas para esta categoría.
            </p>


          </div>



        ) : (



          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">



            {categoryProducts.map((product) => (



              <div
                key={product.id}
                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  bg-white
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-3
                  hover:shadow-2xl
                "
              >



                <Link href={`/products/${product.id}`}>



                  <div className="relative h-64 overflow-hidden">


                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-110
                      "
                    />



                    {product.tag && (

                      <span
                        className="
                          absolute
                          left-4
                          top-4
                          rounded-full
                          bg-black
                          px-3
                          py-2
                          text-xs
                          font-bold
                          text-white
                        "
                      >
                        {product.tag}
                      </span>

                    )}



                    <div className="absolute right-4 top-4">

                      <ProductStatus
  status={product.status}
/>

                    </div>



                  </div>






                  <div className="p-6">


                    <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                      {product.category}
                    </p>



                    <h2 className="mt-2 text-xl font-black text-black">
                      {product.name}
                    </h2>



                    <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                      {product.description}
                    </p>





                    <div className="mt-5 flex items-center justify-between">


                      <p className="text-2xl font-black text-black">

                        ${product.price}

                        <span className="ml-1 text-sm font-medium text-gray-500">
                          MXN
                        </span>

                      </p>




                      <span className="text-yellow-400">
                        ★★★★★
                      </span>



                    </div>



                  </div>



                </Link>





                <Link
                  href={`/products/${product.id}`}
                  className="
                    mx-6
                    mb-6
                    block
                    rounded-xl
                    border
                    border-gray-300
                    py-3
                    text-center
                    font-semibold
                    text-black
                    transition
                    hover:border-blue-600
                    hover:bg-blue-50
                    hover:text-blue-600
                  "
                >

                  👁️ Ver producto

                </Link>



              </div>



            ))}



          </div>



        )}



      </div>


    </main>


  );

}