import PropTypes from "prop-types";

const PAYMENT_STATUS_CONFIG = {
    pending: {
        label: "Pending",
        className:
            "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200",
    },
    paid: {
        label: "Paid",
        className:
            "bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200",
    },
    failed: {
        label: "Failed",
        className:
            "bg-red-100 text-red-800 ring-1 ring-inset ring-red-200",
    },
    refunded: {
        label: "Refunded",
        className:
            "bg-purple-100 text-purple-800 ring-1 ring-inset ring-purple-200",
    },
};

const DEFAULT_CONFIG = {
    label: "Unknown",
    className: "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200",
};

const PaymentBadge = ({ status }) => {
    const config =
        PAYMENT_STATUS_CONFIG[status?.toLowerCase()] || DEFAULT_CONFIG;

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
        >
            {config.label}
        </span>
    );
};

PaymentBadge.propTypes = {
    status: PropTypes.string,
};

PaymentBadge.defaultProps = {
    status: "",
};

export default PaymentBadge;