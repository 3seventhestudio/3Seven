import { FiHeart } from "react-icons/fi";
import { useCart } from "../../../context/CartContext";

function ProductImage({ product }) {
  const { addToCart } = useCart();

  const image =
    product.thumbnail ||
    "https://placehold.co/700x900/f5f5f5/999999?text=3Seven+Studio";

  return (
    <div className="product-image-wrapper">

      {product.discount_percentage > 0 && (
        <span className="product-badge">
          -{product.discount_percentage}%
        </span>
      )}

      {!product.in_stock && (
        <div className="out-of-stock">
          Out of Stock
        </div>
      )}

      <button
        className="wishlist-btn"
        aria-label="Wishlist"
      >
        <FiHeart />
      </button>

      <img
        src={image}
        alt={product.name}
        className="product-image"
      />

      <button
        className="quick-add-btn"
        disabled={!product.in_stock}
        onClick={(e) => {
            e.preventDefault();

            addToCart(
              product.default_variant_id,
              1,
              {
              id: product.id,
              product_name: product.name,
              product_slug: product.slug,

              thumbnail: product.thumbnail,

              size: product.default_size,
              color: product.default_color,

              price: Number(product.price),
              total_price: Number(product.price),

            });
          }}
      >
        {product.in_stock ? "Quick Add" : "Unavailable"}
      </button>

    </div>
  );
}

export default ProductImage;