import { useCart } from "../context/CartContext";

export function useCartHook() {
    return useCart();
}

export default useCartHook;
