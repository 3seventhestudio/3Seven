import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCart,
  addToCart as addToCartApi,
  updateCartItem,
  removeCartItem,
} from "../services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    const token = localStorage.getItem("access_token");

    // Guest user
    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);

      const cart = await getCart();

      setCartItems(cart.data?.items || []);

    } catch (error) {

      // If the token is invalid after refresh attempt,
      // just clear the cart instead of crashing.
      if (error.response?.status === 401) {
        setCartItems([]);
        return;
      }

      console.error("Unable to load cart", error);

      setCartItems([]);

    } finally {

      setLoading(false);

    }
  };

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const mergeGuestCart = async () => {
        const guestCart = JSON.parse(
          localStorage.getItem("guest_cart") || "[]"
        );
        if (guestCart.length > 0) {
          try {
            for (const item of guestCart) {
              await addToCartApi(item.variant_id, item.quantity);
            }
          } catch (e) {
            console.error("Error merging guest cart", e);
          }
          localStorage.removeItem("guest_cart");
        }
        await loadCart();
      };
      mergeGuestCart();
    } else {
      const guestCart = JSON.parse(
        localStorage.getItem("guest_cart") || "[]"
      );
      setCartItems(guestCart);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem(
        "guest_cart",
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, isAuthenticated]);
  const addToCart = async (
    productVariantId,
    quantity = 1,
    productData = null
  ) => {

    const token = localStorage.getItem("access_token");

    // Logged-in user → Backend Cart
    if (token) {

      await addToCartApi(
        productVariantId,
        quantity
      );

      await loadCart();

      return;
    }

    // Guest Cart → localStorage

    setCartItems((current) => {

      const existing = current.find(
        (item) =>
          item.variant_id === productVariantId
      );

      if (existing) {

        return current.map((item) =>
          item.variant_id === productVariantId
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }
            : item
        );

      }

      return [
        ...current,
        {
          ...productData,
          variant_id: productVariantId,
          quantity,
        },
      ];

    });

  };

  const increaseQuantity = async (item) => {

      const token = localStorage.getItem("access_token");

      if (!token) {

          setCartItems(current =>
              current.map(cartItem =>
                  cartItem.variant_id === item.variant_id
                      ? {
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                        }
                      : cartItem
              )
          );

          return;
      }

      await updateCartItem(
          item.id,
          item.quantity + 1
      );

      await loadCart();

  };

  const decreaseQuantity = async (item) => {

      const token = localStorage.getItem("access_token");

      if (!token) {

          if (item.quantity === 1) {

              setCartItems(current =>
                  current.filter(
                      cartItem =>
                          cartItem.variant_id !== item.variant_id
                  )
              );

              return;
          }

          setCartItems(current =>
              current.map(cartItem =>
                  cartItem.variant_id === item.variant_id
                      ? {
                            ...cartItem,
                            quantity: cartItem.quantity - 1,
                        }
                      : cartItem
              )
          );

          return;
      }

      if (item.quantity <= 1) {

          await removeCartItem(item.id);

      } else {

          await updateCartItem(
              item.id,
              item.quantity - 1
          );

      }

      await loadCart();

  };

  const removeFromCart = async (item) => {

      const token = localStorage.getItem("access_token");

      if (!token) {

          setCartItems(current =>
              current.filter(
                  cartItem => cartItem.variant_id !== item.variant_id
              )
          );

          return;
      }

      await removeCartItem(item.id);

      await loadCart();

  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Number(item.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  const shippingCharge = useMemo(() => {
    return subtotal >= 999 ? 0 : 99;
  }, [subtotal]);

  const codCharge = useMemo(() => {
    return 0;
  }, []);

  const gst = useMemo(() => {
    return 0;
  }, []);

  const discount = useMemo(() => {
    return 0;
  }, []);

  const grandTotal = useMemo(() => {
    return (
      subtotal +
      shippingCharge +
      codCharge +
      gst -
      discount
    );
  }, [
    subtotal,
    shippingCharge,
    codCharge,
    gst,
    discount,
  ]);

  return (
    <CartContext.Provider
      value={{
        loading,
        cartItems,
        cartCount,
        subtotal,
        shippingCharge,
        codCharge,
        gst,
        discount,
        grandTotal,
        loadCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}