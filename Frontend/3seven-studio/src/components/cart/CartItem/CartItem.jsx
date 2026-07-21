import "./CartItem.css";

import { FiTrash2 } from "react-icons/fi";

import { useCart } from "../../../context/CartContext";

function CartItem({ item }) {

    const {
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCart();

    return (

        <div className="cart-item">

            <img
                src={item.thumbnail}
                alt={item.product_name}
                className="cart-item-image"
            />

            <div className="cart-item-content">

                <div className="cart-item-top">

                    <div>

                        <h3>{item.product_name}</h3>

                        <p>Size : {item.size}</p>

                        <p>Color : {item.color}</p>

                    </div>

                    <button
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id)}
                    >
                        <FiTrash2 />
                    </button>

                </div>

                <div className="cart-item-footer">

                    <div className="quantity-control">

                        <button
                            onClick={() => decreaseQuantity(item)}
                        >
                            −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                            onClick={() => increaseQuantity(item)}
                        >
                            +
                        </button>

                    </div>

                    <div className="price-box">

                        <span>

                            ₹{Number(item.price).toFixed(2)}

                        </span>

                        <strong>

                            ₹{Number(item.total_price).toFixed(2)}

                        </strong>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CartItem;