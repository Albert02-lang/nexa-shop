import Navbar from "./components/Navbar";
import Hero from "./components/home/Hero";
import Stats from "./components/Stats";
import Benefits from "./components/Benefits";
import Categories from "./components/Categories";
import BestSellers from "./components/BestSellers";
import NewArrivals from "./components/NewArrivals";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-transparent">
        {/* Fondo general de toda la tienda */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_88%_55%,rgba(37,99,235,0.12),transparent_32%),linear-gradient(135deg,var(--hero-start),var(--hero-mid),var(--hero-end))]"
          aria-hidden="true"
        />

        {/* Logo global como marca de agua */}
        <div
          className="pointer-events-none fixed right-[-180px] top-1/2 -z-10 w-[min(70vw,850px)] -translate-y-1/2 opacity-[var(--hero-logo-opacity)]"
          aria-hidden="true"
        >
          <img
            src="/images/logo.png"
            alt=""
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Onda decorativa global */}
        <div
          className="pointer-events-none fixed -bottom-[350px] -left-[300px] -z-10 h-[800px] w-[800px] rounded-full border border-blue-500/10 bg-blue-500/[0.035]"
          aria-hidden="true"
        />

        <Hero />

        <Stats />

        <Benefits />

        <Categories />

        <BestSellers />

        <NewArrivals />

        <FeaturedProducts />
      </main>
    </>
  );
}