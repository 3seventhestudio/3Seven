import api from "../api/api";

export const createRazorpayOrder = async (orderNumber) => {
    const response = await api.post("/payments/create-razorpay-order/", {
        order_number: orderNumber,
    });
    return response.data.data;
};

export const verifyRazorpayPayment = async (data) => {
    const response = await api.post("/payments/verify-razorpay-payment/", data);
    return response.data;
};

export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};
