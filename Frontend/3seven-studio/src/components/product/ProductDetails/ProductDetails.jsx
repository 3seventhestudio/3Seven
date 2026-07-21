import { Heart, ShoppingBag, Zap } from "lucide-react";

import QuantitySelector from "../QuantitySelector/QuantitySelector";
import SizeSelector from "../SizeSelector/SizeSelector";
import { useCart} from "../../../context/CartContext";

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
}) {

    const handleSizeChange = (size) => {

        setSelectedSize(size);

        const variant = product.variants.find(
            (item) => item.size === size
        );

        if (variant) {
            setSelectedVariant(variant);
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
                >

                    <Zap size={20} />

                    Buy Now

                </button>

            </div>

            <button className="wishlist-btn">

                <Heart size={18} />

                Save to Wishlist

            </button>

        </div>

    );

}

export default ProductDetails;