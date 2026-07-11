import Container from "../../common/Container/Container";
import SectionHeading from "../../common/SectionHeading/SectionHeading";
import ProductCard from "../../product/ProductCard/ProductCard";

import newArrivals from "../../../data/products/newArrivals";

import "./NewArrivals.css";

function NewArrivals() {
  return (
    <section className="new-arrivals">
      <Container>
        <SectionHeading
          subtitle="NEW COLLECTION"
          title="New Arrivals"
          description="Discover premium denim designed for confident women."
          center
        />

        <div className="new-arrivals-grid">
          {newArrivals.map((product) => (
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

export default NewArrivals;