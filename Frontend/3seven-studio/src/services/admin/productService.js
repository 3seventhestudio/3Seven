import api from "../../api/api";

/**
 * ==========================================
 * Get Products
 * ==========================================
 */
export const getProducts = async (params = {}) => {
    const response = await api.get(
        "/admin/products/",
        {
            params,
        }
    );

    return response.data;
};

/**
 * ==========================================
 * Get Product Detail
 * ==========================================
 */
export const getProduct = async (productId) => {
    const response = await api.get(
        `/admin/products/${productId}/`
    );

    return response.data;
};

/**
 * ==========================================
 * Create Product
 * ==========================================
 */
export const createProduct = async (data) => {
    const response = await api.post(
        "/admin/products/",
        data
    );

    return response.data;
};

/**
 * ==========================================
 * Update Product
 * ==========================================
 */
export const updateProduct = async (
    productId,
    data
) => {
    const response = await api.put(
        `/admin/products/${productId}/`,
        data
    );

    return response.data;
};

/**
 * ==========================================
 * Delete Product
 * ==========================================
 */
export const deleteProduct = async (
    productId
) => {
    const response = await api.delete(
        `/admin/products/${productId}/`
    );

    return response.data;
};