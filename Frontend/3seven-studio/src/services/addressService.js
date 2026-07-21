import api from "../api/api";

/**
 * Get all saved addresses
 */
export const getAddresses = async () => {
    const response = await api.get("accounts/addresses/");
    return response.data.data;
};

/**
 * Create a new address
 */
export const createAddress = async (data) => {
    const response = await api.post("accounts/addresses/", data);
    return response.data.data;
};

/**
 * Update address
 */
export const updateAddress = async (addressId, data) => {
    const response = await api.put(
        `accounts/addresses/${addressId}/`,
        data
    );

    return response.data.data;
};

/**
 * Delete address
 */
export const deleteAddress = async (addressId) => {
    const response = await api.delete(
        `accounts/addresses/${addressId}/`
    );

    return response.data;
};

/**
 * Set default address
 */
export const setDefaultAddress = async (addressId) => {
    const response = await api.post(
        `accounts/addresses/${addressId}/default/`
    );

    return response.data.data;
};

export default {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
};