import "./BestSellers.css";

import Container from "../../common/Container/Container";
import SectionHeading from "../../common/SectionHeading/SectionHeading";
import ProductCard from "../../product/ProductCard/ProductCard";

import bestSellers from "../../../data/products/bestSellers";

function BestSellers() {
    return (
        <section className="best-sellers">
            <Container>

                <SectionHeading
                    subtitle="MOST LOVED"
                    title="Best Sellers"
                    description="Our most loved denim pieces chosen by customers."
                    center
                />

                <div className="best-sellers-grid">

                    {bestSellers.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

                </div>

            </Container>
        </section>
    );
}

export default BestSellers;