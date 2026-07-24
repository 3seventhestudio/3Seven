import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import product1 from "../../assets/images/products/product-1.jpg";
import product3 from "../../assets/images/products/product-3.jpg";
import product4 from "../../assets/images/products/product-4.jpg";
import product5 from "../../assets/images/products/product-5.jpg";
import "./Collections.css";

function Collections() {
  const collectionsList = [
    {
      id: 1,
      title: "Summer Denim",
      description: "Retro-inspired wide leg flared jeans and high-rise fits tailored with organic cotton.",
      image: product1,
      link: "/shop?category=Jeans",
    },
    {
      id: 2,
      title: "Premium Outerwear",
      description: "Timeless denim trucker jackets and oversized casual layers for transition seasons.",
      image: product3,
      link: "/shop?category=Jackets",
    },
    {
      id: 3,
      title: "Linen & Cotton Shirts",
      description: "Breathable, lightweight boyfriend shirts designed for effortless everyday comfort.",
      image: product4,
      link: "/shop?category=Shirts",
    },
    {
      id: 4,
      title: "Silk Wrap Dresses",
      description: "Elegant, flowing silk midi dresses with adjustable wrap closures for summer evenings.",
      image: product5,
      link: "/shop?category=Dresses",
    },
  ];

  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "Collections" },
        ]}
      />

      <main className="collections-page">
        <div className="container">
          <div className="collections-header">
            <span>Our Curations</span>
            <h1>Timeless Collections</h1>
            <p>
              Explore our capsule wardrobes of artisanal denim, breezy linen, and
              elegant silk signatures designed for the modern lifestyle.
            </p>
          </div>

          <div className="collections-grid">
            {collectionsList.map((col) => (
              <div key={col.id} className="collection-card">
                <div className="collection-img-box">
                  <img src={col.image} alt={col.title} />
                </div>
                <div className="collection-info">
                  <h2>{col.title}</h2>
                  <p>{col.description}</p>
                  <Link to={col.link} className="btn-collection">
                    Explore Collection →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Collections;
