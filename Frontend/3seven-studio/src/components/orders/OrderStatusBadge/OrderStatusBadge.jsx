import { getOrderStatus } from "../../../utils/orders/orderStatus";

import "./OrderStatusBadge.css";


function OrderStatusBadge({ status }) {

    const statusInfo = getOrderStatus(status);


    return (
        <span
            className="order-status-badge"
            style={{
                backgroundColor: `${statusInfo.color}20`,
                color: statusInfo.color,
            }}
        >
            {statusInfo.label}
        </span>
    );
}


export default OrderStatusBadge;