import api from "../../api/api";

export const getInventory = async (params = {}) => {
    const response = await api.get("/inventory/", { params });
    return response.data;
};

export const updateInventory = async (variantId, data) => {
    const response = await api.put(`/inventory/${variantId}/`, data);
    return response.data;
};