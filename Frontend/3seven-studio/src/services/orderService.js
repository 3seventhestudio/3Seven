import api from "../api/api";

/**
 * Create Order (Checkout)
 */
export const checkout = async (payload) => {
    const response = await api.post("/orders/checkout/", payload);
    return response.data.data;
};

/**
 * Get Logged-in User Orders
 */
export const getOrders = async () => {
    const response = await api.get("/orders/");
    return response.data.data;
};

/**
 * Get Single Order Details
 */
export const getOrderDetails = async (orderNumber) => {
    const response = await api.get(`/orders/${orderNumber}/`);
    return response.data.data;
};

const orderService = {
    checkout,
    getOrders,
    getOrderDetails,
};

export default orderService;