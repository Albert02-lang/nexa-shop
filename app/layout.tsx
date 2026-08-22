import type { Metadata } from "next";
import "./globals.css";

import ProductSync from "./components/ProductSync";

export const metadata: Metadata = {
  title: "Nexa Shop",
  description: "Tienda de ropa Nexa Shop",
};

const themeScript = `
(function () {
  try {
    const savedTheme = localStorage.getItem("nexa-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body>
        <ProductSync />

        {children}
      </body>
    </html>
  );
}
