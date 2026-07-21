import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

import Navbar from "../../../components/layout/Navbar/Navbar";
import Footer from "../../../components/layout/Footer/Footer";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb";

import { getOrderDetails } from "../../../services/orderService";

import "./OrderSuccess.css";

function OrderSuccess() {
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
                "Unable to load your order."
            );
        } finally {
            setLoading(false);
        }
    };

    const currency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(Number(value));

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
                        label: "Order Success",
                    },
                ]}
            />

            <section className="order-success-page">

                {loading && (
                    <div className="order-loading">
                        Loading order...
                    </div>
                )}

                {!loading && error && (
                    <div className="order-error">
                        {error}
                    </div>
                )}

                {!loading && order && (

                    <div className="order-success-card">

                        <FaCheckCircle className="success-icon" />

                        <h1>
                            Thank You!
                        </h1>

                        <p className="success-message">
                            Your order has been placed successfully.
                        </p>

                        <div className="order-basic-info">

                            <div>
                                <span>Order Number</span>
                                <strong>
                                    {order.order_number}
                                </strong>
                            </div>

                            <div>
                                <span>Status</span>
                                <strong>
                                    {order.status}
                                </strong>
                            </div>

                            <div>
                                <span>Payment</span>
                                <strong>
                                    {order.payment_method.toUpperCase()}
                                </strong>
                            </div>

                        </div>

                        <div className="success-section">

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

                            {order.shipping_address.landmark && (
                                <p>
                                    {order.shipping_address.landmark}
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

                        <div className="success-section">

                            <h2>
                                Order Items
                            </h2>

                            {order.items.map(item => (

                                <div
                                    className="success-item"
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

                                    </div>

                                    <div>

                                        <p>
                                            Qty: {item.quantity}
                                        </p>

                                        <strong>
                                            {currency(item.total_price)}
                                        </strong>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="success-section">

                            <h2>
                                Order Summary
                            </h2>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{currency(order.subtotal)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{currency(order.shipping_charge)}</span>
                            </div>

                            <div className="summary-row">
                                <span>COD Charges</span>
                                <span>{currency(order.cod_charge)}</span>
                            </div>

                            <div className="summary-row">
                                <span>GST</span>
                                <span>{currency(order.gst)}</span>
                            </div>

                            {Number(order.discount) > 0 && (
                                <div className="summary-row">
                                    <span>Discount</span>
                                    <span>
                                        -{currency(order.discount)}
                                    </span>
                                </div>
                            )}

                            <div className="summary-row total">
                                <span>Grand Total</span>
                                <span>
                                    {currency(order.grand_total)}
                                </span>
                            </div>

                        </div>

                        <div className="success-actions">

                            <Link
                                to="/shop"
                                className="primary-btn"
                            >
                                Continue Shopping
                            </Link>

                            <Link
                                to="/orders"
                                className="secondary-btn"
                            >
                                My Orders
                            </Link>

                        </div>

                    </div>

                )}

            </section>

            <Footer />
        </>
    );
}

export default OrderSuccess;