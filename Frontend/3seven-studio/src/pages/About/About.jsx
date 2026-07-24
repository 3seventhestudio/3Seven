import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import aboutStudio from "../../assets/images/about/about-studio.jpg";
import "./About.css";

function About() {
  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "About" },
        ]}
      />

      <main className="about-page">
        <div className="container">
          <div className="about-hero">
            <span className="subtitle">Our Philosophy</span>
            <h1>Artisanal Quality, Sustainable Luxury</h1>
          </div>

          <div className="about-grid">
            <div className="about-image-box">
              <img src={aboutStudio} alt="3Seven Studio workspace" />
            </div>

            <div className="about-content">
              <h2>The Story of 3Seven Studio</h2>
              <p>
                Founded on the principles of minimal elegance and premium quality,
                3Seven Studio crafts capsule collections designed to stand the test
                of time. We specialize in working with organic fabrics, traditional
                Japanese shuttle looms, and modern ergonomic cuts.
              </p>
              <p>
                Our vision is to redefine daily styling with effortless garments that
                harmonize raw texture with structural beauty. Each piece is treated as a
                collectible canvas, crafted under fair trade standards and built to last.
              </p>

              <div className="about-pillars">
                <div className="pillar">
                  <h3>Sourcing</h3>
                  <p>100% GOTS-certified organic cotton, linen, and pure washed silk.</p>
                </div>
                <div className="pillar">
                  <h3>Artistry</h3>
                  <p>Handcrafted construction with detailed double-stitched reinforcements.</p>
                </div>
                <div className="pillar">
                  <h3>Future</h3>
                  <p>Carbon-neutral shipping and fully compostable packaging materials.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;
