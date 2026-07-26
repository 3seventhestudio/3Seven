import PropTypes from "prop-types";

const STATUS_CONFIG = {
    pending: {
        label: "Pending",
        className:
            "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200",
    },
    confirmed: {
        label: "Confirmed",
        className:
            "bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-200",
    },
    processing: {
        label: "Processing",
        className:
            "bg-indigo-100 text-indigo-800 ring-1 ring-inset ring-indigo-200",
    },
    shipped: {
        label: "Shipped",
        className:
            "bg-sky-100 text-sky-800 ring-1 ring-inset ring-sky-200",
    },
    delivered: {
        label: "Delivered",
        className:
            "bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200",
    },
    cancelled: {
        label: "Cancelled",
        className:
            "bg-red-100 text-red-800 ring-1 ring-inset ring-red-200",
    },
    returned: {
        label: "Returned",
        className:
            "bg-orange-100 text-orange-800 ring-1 ring-inset ring-orange-200",
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

const StatusBadge = ({ status }) => {
    const config =
        STATUS_CONFIG[status?.toLowerCase()] || DEFAULT_CONFIG;

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
        >
            {config.label}
        </span>
    );
};

StatusBadge.propTypes = {
    status: PropTypes.string,
};

StatusBadge.defaultProps = {
    status: "",
};

export default StatusBadge;