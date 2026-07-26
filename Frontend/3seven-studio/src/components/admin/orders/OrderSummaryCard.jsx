import PropTypes from "prop-types";
import {
    Calendar,
    CreditCard,
    Receipt,
    Truck,
    BadgePercent,
    Landmark,
} from "lucide-react";

const formatCurrency = (value) => {
    const amount = Number(value || 0);

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
    }).format(amount);
};

const formatPaymentMethod = (method) => {
    if (!method) return "-";

    return method
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const SummaryRow = ({
    icon: Icon,
    label,
    value,
    valueClassName = "text-gray-900",
}) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-100 p-2">
                <Icon className="h-4 w-4 text-gray-600" />
            </div>

            <span className="text-sm text-gray-600">{label}</span>
        </div>

        <span className={`text-sm font-semibold ${valueClassName}`}>
            {value}
        </span>
    </div>
);

const OrderSummaryCard = ({ order }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Order Summary
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Pricing and payment information.
                </p>
            </div>

            <div className="space-y-5 p-6">
                <SummaryRow
                    icon={Receipt}
                    label="Subtotal"
                    value={formatCurrency(order.subtotal)}
                />

                <SummaryRow
                    icon={Truck}
                    label="Shipping"
                    value={formatCurrency(order.shipping_charge)}
                />

                <SummaryRow
                    icon={CreditCard}
                    label="COD Charge"
                    value={formatCurrency(order.cod_charge)}
                />

                <SummaryRow
                    icon={Landmark}
                    label="Tax"
                    value={formatCurrency(order.tax_amount)}
                />

                <SummaryRow
                    icon={BadgePercent}
                    label="Discount"
                    value={formatCurrency(order.discount_amount)}
                    valueClassName="text-green-600"
                />

                <div className="border-t border-gray-200 pt-5">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-gray-900">
                            Grand Total
                        </span>

                        <span className="text-xl font-bold text-indigo-600">
                            {formatCurrency(order.grand_total)}
                        </span>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-5 space-y-4">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Payment Method
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                            {formatPaymentMethod(order.payment_method)}
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <Calendar className="mt-0.5 h-5 w-5 text-gray-400" />

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Order Date
                            </p>

                            <p className="mt-1 text-sm text-gray-700">
                                {formatDate(order.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

OrderSummaryCard.propTypes = {
    order: PropTypes.shape({
        subtotal: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        shipping_charge: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        cod_charge: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        tax_amount: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        discount_amount: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        grand_total: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        payment_method: PropTypes.string,
        created_at: PropTypes.string,
    }).isRequired,
};

export default OrderSummaryCard;