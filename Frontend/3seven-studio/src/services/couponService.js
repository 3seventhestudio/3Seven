import api from "../api/api";

export const applyCoupon = async (code) => {
    const response = await api.post("/coupons/apply/", { code });
    return response.data;
};
