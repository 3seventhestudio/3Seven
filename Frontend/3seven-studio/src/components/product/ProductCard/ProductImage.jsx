import { FiHeart } from "react-icons/fi";
import { useCart } from "../../../context/CartContext";


function ProductImage({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="product-image-wrapper">

      {product.badge && (
        <span className="product-badge">
          {product.badge}
        </span>
      )}

      <button
        className="wishlist-btn"
        aria-label="Wishlist"
      >
        <FiHeart />
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="product-image primary-image"
      />

      <img
        src={product.hoverImage}
        alt={product.name}
        className="product-image hover-image"
      />

      <button
    className="quick-add-btn"
    onClick={() => addToCart(product)}
>
    Quick Add
</button>

    </div>
  );
}

export default ProductImage;