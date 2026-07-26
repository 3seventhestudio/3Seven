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

export const getShippingQuotes = async (orderId, packageData = {}) => {
    const response = await api.post(
        `/orders/admin/${orderId}/shipping-quotes/`,
        packageData
    );

    return response.data;
};

export const acceptAndShipOrder = async (orderId, courierData = {}) => {
    const response = await api.post(
        `/orders/admin/${orderId}/accept-and-ship/`,
        courierData
    );

    return response.data;
};