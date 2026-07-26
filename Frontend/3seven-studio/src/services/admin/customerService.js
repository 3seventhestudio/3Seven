import api from "../../api/api";

export const getCustomers = async (params = {}) => {
    const response = await api.get("/accounts/admin/customers/", {
        params,
    });

    return response.data;
};

export const getCustomer = async (customerId) => {
    const response = await api.get(
        `/accounts/admin/customers/${customerId}/`
    );

    return response.data;
};

export const updateCustomer = async (customerId, data) => {
    const response = await api.put(
        `/accounts/admin/customers/${customerId}/`,
        data
    );

    return response.data;
};