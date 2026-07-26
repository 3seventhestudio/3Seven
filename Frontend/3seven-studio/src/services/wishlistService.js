import api from "../api/api";

export const getWishlist = async () => {
    const response = await api.get("/wishlist/");
    return response.data;
};

export const toggleWishlist = async (productId) => {
    const response = await api.post("/wishlist/toggle/", {
        product_id: productId,
    });
    return response.data;
};

export const removeFromWishlist = async (itemId) => {
    const response = await api.delete(`/wishlist/${itemId}/`);
    return response.data;
};
