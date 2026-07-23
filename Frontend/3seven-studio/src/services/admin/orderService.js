import api from "../../api/api";

export const getOrders = async (params = {}) => {
    const response = await api.get("/orders/admin/", {
        params,
    });

    return response.data;
};

export const getOrder = async (orderId) => {
    const response = await api.get(
        `/orders/admin/${orderId}/`
    );

    return response.data;
};

export const updateOrder = async (orderId, data) => {
    const response = await api.put(
        `/orders/admin/${orderId}/`,
        data
    );

    return response.data;
};