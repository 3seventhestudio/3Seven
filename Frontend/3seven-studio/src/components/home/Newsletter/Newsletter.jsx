import "./Newsletter.css";

import Container from "../../common/Container/Container";

function Newsletter() {
    return (
        <section className="newsletter">

            <Container>

                <div className="newsletter-wrapper">

                    <span className="newsletter-subtitle">
                        STAY CONNECTED
                    </span>

                    <h2>
                        Join the 3Seven Studio Community
                    </h2>

                    <p>
                        Subscribe to receive early access to new collections,
                        exclusive offers and denim styling inspiration.
                    </p>

                    <form className="newsletter-form">

                        <input
                            type="email"
                            placeholder="Enter your email address"
                        />

                        <button type="submit">
                            Subscribe
                        </button>

                    </form>

                </div>

            </Container>

        </section>
    );
}

export default Newsletter;  