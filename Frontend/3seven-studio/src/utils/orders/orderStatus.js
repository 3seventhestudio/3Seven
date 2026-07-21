const ORDER_STATUS = {
    pending: {
        label: "Pending",
        color: "#F59E0B",
    },

    confirmed: {
        label: "Confirmed",
        color: "#3B82F6",
    },

    processing: {
        label: "Processing",
        color: "#6366F1",
    },

    shipped: {
        label: "Shipped",
        color: "#8B5CF6",
    },

    delivered: {
        label: "Delivered",
        color: "#10B981",
    },

    cancelled: {
        label: "Cancelled",
        color: "#EF4444",
    },

    returned: {
        label: "Returned",
        color: "#6B7280",
    },

    refunded: {
        label: "Refunded",
        color: "#6B7280",
    },
};

export default ORDER_STATUS;

export const getOrderStatus = (status) => {
    return (
        ORDER_STATUS[status] || {
            label: status,
            color: "#6B7280",
        }
    );
};