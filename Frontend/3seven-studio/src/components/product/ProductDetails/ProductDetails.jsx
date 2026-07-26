import { useState } from "react";
import { Heart, ShoppingBag, Zap } from "lucide-react";
import { toast } from "react-toastify";

import QuantitySelector from "../QuantitySelector/QuantitySelector";
import SizeSelector from "../SizeSelector/SizeSelector";
import { toggleWishlist } from "../../../services/wishlistService";

import "./ProductDetails.css";

function ProductDetails({
    product,
    selectedVariant,
    setSelectedVariant,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    onAddToCart,
    onBuyNow,
}) {

    const [wishlisted, setWishlisted] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    const handleWishlistToggle = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            toast.info("Please log in to save items to your wishlist.");
            return;
        }

        try {

            setWishlistLoading(true);

            const response = await toggleWishlist(product.id);

            const inWishlist = response.data?.in_wishlist;

            setWishlisted(inWishlist);

            toast.success(
                inWishlist
                    ? "Added to wishlist."
                    : "Removed from wishlist."
            );

        } catch (error) {

            toast.error("Failed to update wishlist.");

        } finally {

            setWishlistLoading(false);

        }

    };

    return (

        <div className="product-details">

            <span className="product-category">
                {product.category}
            </span>

            <h1 className="product-title">
                {product.name}
            </h1>

            <div className="product-price-row">

                <span className="selling-price">
                    ₹{selectedVariant?.price || product.price}
                </span>

                {product.compare_price && (

                    <span className="compare-price">
                        ₹{product.compare_price}
                    </span>

                )}

                {product.discount_percentage > 0 && (

                    <span className="discount-badge">
                        {product.discount_percentage}% OFF
                    </span>

                )}

            </div>

            <div className="stock-status">

                {selectedVariant?.stock_quantity > 0
                    ? `✔ In Stock (${selectedVariant.stock_quantity} available)`
                    : "✖ Out of Stock"}

            </div>

            <p className="short-description">
                {product.short_description}
            </p>

            <SizeSelector
                variants={product.variants}
                value={selectedSize}
                onChange={(size) => {

                    setSelectedSize(size);

                    const variant = product.variants.find(
                        (item) => item.size === size
                    );

                    setSelectedVariant(variant);

                }}
            />

            <QuantitySelector
                value={quantity}
                max={selectedVariant?.stock_quantity || 10}
                onChange={setQuantity}
            />

            <div className="product-actions">

                <button
                    className="add-cart-btn"
                    onClick={onAddToCart}
                >

                    <ShoppingBag size={20} />

                    Add To Cart

                </button>

                <button
                    className="buy-now-btn"
                    disabled={!selectedVariant}
                    onClick={onBuyNow}
                >

                    <Zap size={20} />

                    Buy Now

                </button>

            </div>

            <button
                className={`wishlist-btn ${wishlisted ? "wishlisted" : ""}`}
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
            >

                <Heart
                    size={18}
                    fill={wishlisted ? "#ef4444" : "none"}
                    color={wishlisted ? "#ef4444" : "currentColor"}
                />

                {wishlisted ? "Saved to Wishlist" : "Save to Wishlist"}

            </button>

        </div>

    );

}

export default ProductDetails;