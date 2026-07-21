import { ShoppingBag } from "lucide-react";
import { useCart } from "../../../context/CartContext";

import "./CartIcon.css";

function CartIcon({ onClick }) {
  const { cartCount } = useCart();

  return (
    <button
      className="cart-icon"
      onClick={onClick}
      aria-label="Shopping Cart"
    >
      <ShoppingBag size={22} />

      {cartCount > 0 && (
        <span className="cart-count">
          {cartCount}
        </span>
      )}
    </button>
  );
}

export default CartIcon;