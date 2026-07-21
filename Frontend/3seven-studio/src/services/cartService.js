import api from "../api/api";

// Get Cart
export const getCart = async () => {
  const response = await api.get("cart/");
  return response.data.data;
};

// Add Item
export const addToCart = async (product_variant_id, quantity = 1) => {
  const response = await api.post("cart/add/", {
    product_variant_id,
    quantity,
  });

  return response.data;
};

// Update Quantity
export const updateCartItem = async (cartItemId, quantity) => {
  const response = await api.patch(
    `cart/items/${cartItemId}/`,
    {
      quantity,
    }
  );

  return response.data;
};

// Remove Item
export const removeCartItem = async (cartItemId) => {
  const response = await api.delete(
    `cart/items/${cartItemId}/delete/`
  );

  return response.data;
};