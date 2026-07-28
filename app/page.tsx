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

      <main>

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