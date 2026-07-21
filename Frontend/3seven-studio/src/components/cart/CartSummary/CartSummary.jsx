import { Link } from "react-router-dom";

import { useCart } from "../../../context/CartContext";

import "./CartSummary.css";

function CartSummary() {

    const {

        subtotal,

        cartCount,

    } = useCart();

    return (

        <div className="cart-summary">

            <div className="summary-row">

                <span>

                    Subtotal ({cartCount} Items)

                </span>

                <strong>

                    ₹{subtotal.toFixed(2)}

                </strong>

            </div>

            <p className="summary-note">

                Taxes and shipping are calculated at checkout.

            </p>

            <Link
                to="/cart"
                className="view-cart-btn"
            >

                View Cart

            </Link>

            <Link
                to="/checkout"
                className="checkout-btn"
            >

                Secure Checkout

            </Link>

        </div>

    );

}

export default CartSummary;