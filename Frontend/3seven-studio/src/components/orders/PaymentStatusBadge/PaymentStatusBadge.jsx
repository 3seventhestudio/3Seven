import { getPaymentStatus } from "../../../utils/orders/paymentStatus";

import "./PaymentStatusBadge.css";

function PaymentStatusBadge({ status }) {
    const paymentStatus = getPaymentStatus(status);

    return (
        <span
            className="payment-status-badge"
            style={{
                backgroundColor: `${paymentStatus.color}20`,
                color: paymentStatus.color,
            }}
        >
            {paymentStatus.label}
        </span>
    );
}

export default PaymentStatusBadge;