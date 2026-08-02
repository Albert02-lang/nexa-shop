import type { Metadata } from "next";
import "./globals.css";

import ProductSync from "./components/ProductSync";


export const metadata: Metadata = {
  title: "Nexa Shop",
  description: "Tienda de ropa Nexa Shop",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="es">

      <body>

        <ProductSync />

        {children}

      </body>

    </html>

  );

}