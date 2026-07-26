import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../../components/layout/Navbar/Navbar";
import Footer from "../../../components/layout/Footer/Footer";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb";

import OrderStatusBadge from "../../../components/orders/OrderStatusBadge/OrderStatusBadge";
import ReviewModal from "../../../components/reviews/ReviewModal";
import PaymentStatusBadge from "../../../components/orders/PaymentStatusBadge/PaymentStatusBadge";

import { getOrderDetails } from "../../../services/orderService";
import { createReview, updateReview, getReview } from "../../../services/reviewService";

import { formatCurrency } from "../../../utils/formatters/currency";
import { formatDate } from "../../../utils/formatters/date";

import "./OrderDetails.css";

function OrderDetails() {
    const { orderNumber } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const [reviewLoading, setReviewLoading] = useState(false);

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

    const handleReview = async (item) => {

        try {

            setSelectedItem(item);

            if (item.is_reviewed && item.review_id) {

                const response = await getReview(item.review_id);

                setSelectedReview(response.data);

            } else {

                setSelectedReview(null);

            }

            setReviewModalOpen(true);

        } catch (error) {

            console.error(error);

        }

    };

    const handleReviewSubmit = async (formData) => {
        try {
            setReviewLoading(true);
            if (selectedItem.is_reviewed) {
                await updateReview(
                    selectedItem.review_id,
                    formData
                );
            } else {
                await createReview(
                    selectedItem.product_slug,
                    {
                        ...formData,
                        order_item_id: selectedItem.id,
                    }
                );
            }
            setReviewModalOpen(false);
            setSelectedReview(null);
            await loadOrder();
        } catch (error) {
            console.error(error);
        } finally {
            setReviewLoading(false);
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

                            <div className="order-item" key={item.id} >
                                <div className="order-item-left">

                                <img
                                    src={item.product_image}
                                    alt={item.product_name}
                                    className="order-item-image"
                                />

                                <div className="order-item-info">

                                    <strong>{item.product_name}</strong>

                                    <p>Size: {item.size}</p>

                                    <p>Color: {item.color}</p>

                                    <p>Qty: {item.quantity}</p>

                                    {item.can_review && !item.is_reviewed && (
                                        <button
                                            className="review-btn"
                                            onClick={() => handleReview(item)}
                                        >
                                            Write Review
                                        </button>
                                    )}

                                    {item.is_reviewed && (
                                        <button
                                            className="review-btn secondary"
                                            onClick={() => handleReview(item)}
                                        >
                                            Edit Review
                                        </button>
                                    )}

                                </div>

                            </div>

                            <div className="order-item-right">

                                <strong>
                                    {formatCurrency(item.total_price)}
                                </strong>

                            </div>

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
            <ReviewModal
                open={reviewModalOpen}
                loading={reviewLoading}
                review={
                    selectedItem?.is_reviewed
                        ? {
                            id: selectedItem.review_id,
                            rating: selectedItem.rating,
                            title: selectedItem.review_title,
                            comment: selectedItem.review_comment,
                        }
                        : null
                }
                onClose={() => {
                    setReviewModalOpen(false);
                    setSelectedReview(null);
                }}
                onSubmit={handleReviewSubmit}
            />
            
        </>
    );
}

export default OrderDetails;