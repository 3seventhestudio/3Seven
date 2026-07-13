import "./ProductCard.css";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`}>
        <ProductImage product={product} />
        <ProductInfo product={product} />
      </Link>
    </div>
  );
}

export default ProductCard;