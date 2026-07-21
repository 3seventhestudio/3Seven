import { Link } from "react-router-dom";

import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";
import PaymentStatusBadge from "../PaymentStatusBadge/PaymentStatusBadge";

import { formatCurrency } from "../../../utils/formatters/currency";
import { formatDate } from "../../../utils/formatters/date";

import "./OrderCard.css";

function OrderCard({ order }) {
    return (
        <article className="order-card">

            <div className="order-card-header">

                <div>

                    <h3 className="order-number">
                        {order.order_number}
                    </h3>

                    <p className="order-date">
                        Ordered on {formatDate(order.created_at)}
                    </p>

                </div>

                <OrderStatusBadge
                    status={order.status}
                />

            </div>

            <div className="order-card-body">

                <div className="order-info">

                    <span className="label">
                        Payment
                    </span>

                    <PaymentStatusBadge
                        status={order.payment_status}
                    />

                </div>

                <div className="order-info">

                    <span className="label">
                        Items
                    </span>

                    <strong>
                        {order.items?.length || 0}
                    </strong>

                </div>

                <div className="order-info">

                    <span className="label">
                        Total
                    </span>

                    <strong>
                        {formatCurrency(order.grand_total)}
                    </strong>

                </div>

            </div>

            <div className="order-card-footer">

                <Link
                    to={`/orders/${order.order_number}`}
                    className="view-order-btn"
                >
                    View Details
                </Link>

            </div>

        </article>
    );
}

export default OrderCard;