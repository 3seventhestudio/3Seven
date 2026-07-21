const PAYMENT_STATUS = {
    pending: {
        label: "Pending",
        color: "#F59E0B",
    },

    paid: {
        label: "Paid",
        color: "#10B981",
    },

    failed: {
        label: "Failed",
        color: "#EF4444",
    },

    refunded: {
        label: "Refunded",
        color: "#6B7280",
    },
};

export default PAYMENT_STATUS;

export const getPaymentStatus = (status) => {
    return (
        PAYMENT_STATUS[status] || {
            label: status,
            color: "#6B7280",
        }
    );
};