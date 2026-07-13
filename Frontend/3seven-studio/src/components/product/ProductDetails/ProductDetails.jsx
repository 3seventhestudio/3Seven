import { Heart, ShoppingBag, Zap } from "lucide-react";

import QuantitySelector from "../QuantitySelector/QuantitySelector";
import SizeSelector from "../SizeSelector/SizeSelector";

import "./ProductDetails.css";

function ProductDetails({ product }) {

    return (

        <div className="product-details">

            <span className="product-category">
                {product.category?.name || product.category}
            </span>

            <h1 className="product-title">
                {product.name}
            </h1>

            <div className="product-price-row">

                <span className="selling-price">
                    ₹{product.price}
                </span>

                {
                    product.compare_price && (

                        <span className="compare-price">
                            ₹{product.compare_price}
                        </span>

                    )
                }

                {
                    product.discount_percentage > 0 && (

                        <span className="discount-badge">

                            {product.discount_percentage}% OFF

                        </span>

                    )
                }

            </div>

            <div className="stock-status">

                {
                    product.in_stock
                        ? "✔ In Stock"
                        : "✖ Out of Stock"
                }

            </div>

            <p className="short-description">

                {product.short_description}

            </p>

            <SizeSelector
                variants={product.variants}
            />

            <QuantitySelector max={10}/>

            <div className="product-actions">

                <button className="add-cart-btn">

                    <ShoppingBag size={20} />

                    Add To Cart

                </button>

                <button className="buy-now-btn">

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