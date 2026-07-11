import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/home/Hero/Hero";
import TrustStrip from "../../components/home/TrustStrip/TrustStrip";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import CollectionBanner from "../../components/home/CollectionBanner/CollectionBanner";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import AboutStudio from "../../components/home/AboutStudio/AboutStudio";
import Newsletter from "../../components/home/Newsletter/Newsletter";
import Footer from "../../components/layout/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TrustStrip />
        <NewArrivals />
        <CollectionBanner />
        <BestSellers />
        <AboutStudio />
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}

export default Home;