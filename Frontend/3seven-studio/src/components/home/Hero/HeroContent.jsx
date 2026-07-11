import Button from "../../common/Button/Button";
import { heroContent } from "../../../data/homeContent";

function HeroContent() {
  return (
    <div className="hero-content">

      <span className="hero-badge">
        {heroContent.badge}
      </span>

      <h1>
        {heroContent.title.map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </h1>

      <p>
        {heroContent.description}
      </p>

      <div className="hero-buttons">

        <Button>
          {heroContent.primaryButton}
        </Button>

        <Button variant="outline">
          {heroContent.secondaryButton}
        </Button>

      </div>

    </div>
  );
}

export default HeroContent;