import api from "../../api/api";

/*
|--------------------------------------------------------------------------
| Admin Coupons
|--------------------------------------------------------------------------
*/

export const getCoupons = async (params = {}) => {
    const response = await api.get(
        "/coupons/admin/",
        {
            params,
        }
    );

    return response.data;
};

export const getCoupon = async (couponId) => {
    const response = await api.get(
        `/coupons/admin/${couponId}/`
    );

    return response.data;
};

export const createCoupon = async (data) => {
    const response = await api.post(
        "/coupons/admin/",
        data
    );

    return response.data;
};

export const updateCoupon = async (
    couponId,
    data
) => {
    const response = await api.put(
        `/coupons/admin/${couponId}/`,
        data
    );

    return response.data;
};

export const deleteCoupon = async (
    couponId
) => {
    const response = await api.delete(
        `/coupons/admin/${couponId}/`
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Dropdowns
|--------------------------------------------------------------------------
*/

export const getCategoryDropdown = async (
    search = ""
) => {
    const response = await api.get(
        "/catalog/admin/categories/dropdown/",
        {
            params: {
                search,
            },
        }
    );

    return response.data;
};

export const getProductDropdown = async (
    search = ""
) => {
    const response = await api.get(
        "/coupons/admin/products/dropdown/",
        {
            params: {
                search,
            },
        }
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Checkout Coupon
|--------------------------------------------------------------------------
*/

export const validateCoupon = async (
    code
) => {
    const response = await api.post(
        "/coupons/validate/",
        {
            code,
        }
    );

    return response.data;
};

export const applyCoupon = async (
    code
) => {
    const response = await api.post(
        "/coupons/apply/",
        {
            code,
        }
    );

    return response.data;
};

export const removeCoupon = async () => {
    const response = await api.delete(
        "/coupons/remove/"
    );

    return response.data;
};