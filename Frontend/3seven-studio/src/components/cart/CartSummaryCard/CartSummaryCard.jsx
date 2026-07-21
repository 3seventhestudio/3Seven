import { Link } from "react-router-dom";

import { useCart } from "../../../context/CartContext";

import "./CartSummaryCard.css";

function CartSummaryCard() {

    const {
        subtotal,
        cartCount,
    } = useCart();

    const shipping = subtotal >= 1999 || subtotal === 0 ? 0 : 99;

    const total = subtotal + shipping;

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