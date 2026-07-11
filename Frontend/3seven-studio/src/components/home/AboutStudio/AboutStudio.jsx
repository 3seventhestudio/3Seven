import "./AboutStudio.css";

import Container from "../../common/Container/Container";

// Temporary image
import aboutImage from "../../../assets/images/about/about-studio.jpg";

function AboutStudio() {
    return (
        <section className="about-studio">

            <Container>

                <div className="about-wrapper">

                    <div className="about-image">

                        <img
                            src={aboutImage}
                            alt="3Seven Studio"
                        />

                    </div>

                    <div className="about-content">

                        <span className="about-subtitle">
                            OUR STORY
                        </span>

                        <h2>
                            Premium Denim Designed For Modern Women
                        </h2>

                        <p>
                            At 3Seven Studio, we believe denim should feel as good
                            as it looks. Every pair is designed with premium fabrics,
                            timeless silhouettes, and exceptional craftsmanship to
                            celebrate confidence, comfort, and effortless style.
                        </p>

                        <div className="about-features">

                            <div className="feature-item">
                                <h4>Premium Fabric</h4>
                                <p>Soft, durable denim crafted for everyday wear.</p>
                            </div>

                            <div className="feature-item">
                                <h4>Perfect Fit</h4>
                                <p>Designed to flatter every body shape.</p>
                            </div>

                            <div className="feature-item">
                                <h4>Timeless Style</h4>
                                <p>Minimal designs that never go out of fashion.</p>
                            </div>

                        </div>

                        <button className="about-btn">
                            OUR COLLECTION
                        </button>

                    </div>

                </div>

            </Container>

        </section>
    );
}

export default AboutStudio;