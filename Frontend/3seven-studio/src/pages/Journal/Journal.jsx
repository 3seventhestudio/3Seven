import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import product2 from "../../assets/images/products/product-2.jpg";
import product3 from "../../assets/images/products/product-3.jpg";
import product4 from "../../assets/images/products/product-4.jpg";
import "./Journal.css";

function Journal() {
  const articles = [
    {
      id: 1,
      title: "The Art of Selvedge: Why Loom Speed Matters",
      category: "Craftsmanship",
      date: "July 24, 2026",
      readTime: "5 min read",
      image: product2,
      excerpt: "Explore how slow shuttle loom weaving creates the signature textured edge and custom fit profiles that define raw denim collectibles.",
    },
    {
      id: 2,
      title: "How to Style Denim Jackets: Capsule Layering Guides",
      category: "Styling",
      date: "July 18, 2026",
      readTime: "4 min read",
      image: product3,
      excerpt: "Step-by-step guides on pairing structured drop-shoulder trucker jackets with linen shirts or silk summer midi dresses for daily grace.",
    },
    {
      id: 3,
      title: "Building an Organic Capsule Wardrobe",
      category: "Sustainability",
      date: "July 10, 2026",
      readTime: "6 min read",
      image: product4,
      excerpt: "A curated guide on choosing natural fibers, understanding weave durabilities, and prioritizing classic silhouettes over fast trends.",
    },
  ];

  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "Journal" },
        ]}
      />

      <main className="journal-page">
        <div className="container">
          <div className="journal-header">
            <span>Editorials</span>
            <h1>The Studio Journal</h1>
            <p>
              Deep dives into denim engineering, style profiles, and our ongoing
              commitments to fair trade craft and organic agriculture.
            </p>
          </div>

          <div className="journal-list">
            {articles.map((art) => (
              <article key={art.id} className="journal-item">
                <div className="journal-img-wrapper">
                  <img src={art.image} alt={art.title} />
                </div>
                <div className="journal-text-box">
                  <div className="journal-meta">
                    <span className="category">{art.category}</span>
                    <span className="dot">•</span>
                    <span>{art.date}</span>
                    <span className="dot">•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h2>{art.title}</h2>
                  <p>{art.excerpt}</p>
                  <button className="read-more-btn">Read Article →</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Journal;
