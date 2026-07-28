import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductSync from "./components/ProductSync";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {

  title: "Nexa Shop",

  description:
    "Moda para todos con estilo y piezas únicas.",

};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="es">


      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >


        <ProductSync />


        <Navbar />


        {children}


        <Footer />


      </body>


    </html>

  );

}