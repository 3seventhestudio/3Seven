import heroImage from "../../../assets/images/hero/hero-model.jpg";

import FloatingCard from "./FloatingCard";
import TrustBadge from "./TrustBadge";

function HeroImage() {
  return (
    <div className="hero-image-wrapper">

      <TrustBadge />

      <img
        src={heroImage}
        alt="3Seven Studio Premium Denim"
        className="hero-image"
      />

      <FloatingCard />

    </div>
  );
}

export default HeroImage;