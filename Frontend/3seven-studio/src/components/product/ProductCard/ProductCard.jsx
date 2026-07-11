import "./ProductCard.css";

import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <ProductImage product={product} />

      <ProductInfo product={product} />

    </div>
  );
}

export default ProductCard;