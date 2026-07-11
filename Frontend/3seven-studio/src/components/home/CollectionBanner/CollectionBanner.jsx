import "./CollectionBanner.css";

import Container from "../../common/Container/Container";

// Temporary placeholder image
// Replace this import once we generate the final banner
import bannerImage from "../../../assets/images/banner/collection-banner.jpg";

function CollectionBanner() {
    return (
        <section className="collection-banner">
            <Container>
                <div className="collection-banner-wrapper">

                    <div className="collection-banner-content">

                        <span className="collection-subtitle">
                            PREMIUM DENIM
                        </span>

                        <h2>
                            Designed for Every Body.
                        </h2>

                        <p>
                            Discover timeless denim crafted with premium fabrics,
                            modern silhouettes, and effortless comfort for everyday confidence.
                        </p>

                        <button className="collection-btn">
                            SHOP COLLECTION
                        </button>

                    </div>

                    <div className="collection-banner-image">

                        <img
                            src={bannerImage}
                            alt="Premium Denim Collection"
                        />

                    </div>

                </div>
            </Container>
        </section>
    );
}

export default CollectionBanner;