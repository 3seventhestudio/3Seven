import { Link } from "react-router-dom";
import { Tag } from "lucide-react";

import { useCart } from "../../../context/CartContext";

import "./CartSummaryCard.css";

function CartSummaryCard({ appliedCoupon }) {

    const {
        subtotal,
        cartCount,
    } = useCart();

    const discount = appliedCoupon ? Number(appliedCoupon.discount) : 0;

    const shipping = subtotal >= 1999 || subtotal === 0
        ? 0
        : (appliedCoupon?.free_shipping ? 0 : 99);

    const total = subtotal + shipping - discount;

    return (

        <div className="cart-summary-card">

            <h2>Order Summary</h2>

            <div className="summary-row">

                <span>
                    Subtotal ({cartCount} Items)
                </span>

                <strong>
                    ₹{subtotal.toFixed(2)}
                </strong>

            </div>

            <div className="summary-row">

                <span>
                    Shipping
                </span>

                <strong>
                    {shipping === 0
                        ? "FREE"
                        : `₹${shipping}`}
                </strong>

            </div>

            {discount > 0 && (

                <div className="summary-row discount-row">

                    <span>
                        <Tag size={14} />
                        Coupon ({appliedCoupon.code})
                    </span>

                    <strong className="discount-value">
                        -₹{discount.toFixed(2)}
                    </strong>

                </div>

            )}

            <hr />

            <div className="summary-total">

                <span>Total</span>

                <strong>
                    ₹{total.toFixed(2)}
                </strong>

            </div>

            <p className="shipping-note">
                Free shipping on orders above ₹1,999.
            </p>

            <Link
                to="/checkout"
                className="checkout-btn"
            >
                Proceed to Checkout
            </Link>

        </div>

    );

}

export default CartSummaryCard;