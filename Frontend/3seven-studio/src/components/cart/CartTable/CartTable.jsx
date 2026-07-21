import { Link } from "react-router-dom";

import "./CartTable.css";

import CartItem from "../CartItem/CartItem";

import { useCart } from "../../../context/CartContext";

function CartTable() {

    const { cartItems } = useCart();

    if (cartItems.length === 0) {

        return (

            <div className="cart-empty">

                <h2>Your shopping bag is empty</h2>

                <p>
                    Looks like you haven't added anything yet.
                </p>

                <Link
                    to="/shop"
                    className="continue-shopping-btn"
                >
                    Continue Shopping
                </Link>

            </div>

        );

    }

    return (

        <div className="cart-table">

            {cartItems.map((item) => (

                <CartItem
                    key={item.id || item.variant_id}
                    item={item}
                />

            ))}

        </div>

    );

}

export default CartTable;