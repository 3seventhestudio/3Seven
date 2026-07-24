import "./CartDrawer.css";

import { FiX } from "react-icons/fi";

import CartItem from "../CartItem/CartItem";
import CartSummary from "../CartSummary/CartSummary";

import { useCart } from "../../../context/CartContext";

function CartDrawer({

    isOpen,

    onClose,

}) {

    const {

        cartItems,

    } = useCart();

    return (

        <>

            <div
                className={`cart-overlay ${isOpen ? "active" : ""}`}
                onClick={onClose}
            />

            <aside
                className={`cart-drawer ${isOpen ? "open" : ""}`}
            >

                <div className="cart-header">

                    <h2>
                        Shopping Bag
                    </h2>

                    <button
                        onClick={onClose}
                    >
                        <FiX />
                    </button>

                </div>

                <div className="cart-body">

                    {
                        cartItems.length === 0 ? (

                            <div className="empty-cart">

                                <h3>Your bag is empty</h3>

                                <p>

                                    Start shopping to add products.

                                </p>

                            </div>

                        ) : (

                            cartItems.map(item => (

                                <CartItem
                                    key={item.id || item.variant_id}
                                    item={item}
                                />

                            ))

                        )
                    }

                </div>

                <CartSummary />

            </aside>

        </>

    );

}

export default CartDrawer;