import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../../components/layout/Navbar/Navbar";
import Footer from "../../../components/layout/Footer/Footer";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb";

import OrderStatusBadge from "../../../components/orders/OrderStatusBadge/OrderStatusBadge";
import PaymentStatusBadge from "../../../components/orders/PaymentStatusBadge/PaymentStatusBadge";

import { getOrderDetails } from "../../../services/orderService";

import { formatCurrency } from "../../../utils/formatters/currency";
import { formatDate } from "../../../utils/formatters/date";

import "./OrderDetails.css";

function OrderDetails() {
    const { orderNumber } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadOrder();
    }, [orderNumber]);

    const loadOrder = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getOrderDetails(orderNumber);

            setOrder(data);

        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Unable to load order."
            );

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="page-loader">
                    Loading order...
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="page-error">
                    {error}
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <Breadcrumb
                items={[
                    {
                        label: "Home",
                        link: "/",
                    },
                    {
                        label: "My Orders",
                        link: "/orders",
                    },
                    {
                        label: order.order_number,
                    },
                ]}
            />

            <section className="order-details-page">

                <div className="order-details-container">

                    <div className="order-header">

                        <div>

                            <h1>
                                {order.order_number}
                            </h1>

                            <p>
                                Ordered on{" "}
                                {formatDate(order.created_at)}
                            </p>

                        </div>

                        <OrderStatusBadge
                            status={order.status}
                        />

                    </div>

                    <div className="order-section">

                        <h2>
                            Delivery Address
                        </h2>

                        <p>
                            <strong>
                                {order.shipping_address.full_name}
                            </strong>
                        </p>

                        <p>
                            {order.shipping_address.address_line_1}
                        </p>

                        {order.shipping_address.address_line_2 && (
                            <p>
                                {order.shipping_address.address_line_2}
                            </p>
                        )}

                        <p>
                            {order.shipping_address.city},{" "}
                            {order.shipping_address.state}
                        </p>

                        <p>
                            {order.shipping_address.country} -{" "}
                            {order.shipping_address.postal_code}
                        </p>

                        <p>
                            {order.shipping_address.phone_number}
                        </p>

                    </div>

                    <div className="order-section">

                        <h2>
                            Items
                        </h2>

                        {order.items.map((item) => (

                            <div
                                className="order-item"
                                key={item.id}
                            >

                                <div>

                                    <strong>
                                        {item.product_name}
                                    </strong>

                                    <p>
                                        Size: {item.size}
                                    </p>

                                    <p>
                                        Color: {item.color}
                                    </p>

                                    <p>
                                        Qty: {item.quantity}
                                    </p>

                                </div>

                                <strong>
                                    {formatCurrency(
                                        item.total_price
                                    )}
                                </strong>

                            </div>

                        ))}

                    </div>

                    <div className="order-section">

                        <h2>
                            Payment
                        </h2>

                        <div className="summary-row">
                            <span>
                                Method
                            </span>

                            <span>
                                {order.payment_method.toUpperCase()}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span>
                                Status
                            </span>

                            <PaymentStatusBadge
                                status={
                                    order.payment_status
                                }
                            />
                        </div>

                    </div>

                    <div className="order-section">

                        <h2>
                            Order Summary
                        </h2>

                        <div className="summary-row">
                            <span>Subtotal</span>

                            <span>
                                {formatCurrency(order.subtotal)}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>

                            <span>
                                {formatCurrency(order.shipping_charge)}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span>COD</span>

                            <span>
                                {formatCurrency(order.cod_charge)}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span>GST</span>

                            <span>
                                {formatCurrency(order.gst)}
                            </span>
                        </div>

                        <div className="summary-row total">
                            <span>
                                Grand Total
                            </span>

                            <strong>
                                {formatCurrency(order.grand_total)}
                            </strong>
                        </div>

                    </div>

                </div>

            </section>

            <Footer />
        </>
    );
}

export default OrderDetails;