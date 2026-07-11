import "./Hero.css";

import Container from "../../common/Container/Container";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

function Hero() {
  return (
    <section className="hero section">

      <Container>

        <div className="hero-grid">

          <HeroContent />

          <HeroImage />

        </div>

      </Container>

    </section>
  );
}

export default Hero;