import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    CheckCircle2,
    Clock,
    Package,
    Truck,
    CheckCheck,
    Copy,
    ExternalLink,
    FileText,
} from "lucide-react";

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
    const [copied, setCopied] = useState(false);

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

    const handleCopyTracking = () => {
        if (order?.tracking_number) {
            navigator.clipboard.writeText(order.tracking_number);
            setCopied(true);
            toast.success("Tracking number copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
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

    const getStepStatus = (stepName) => {
        if (!order) return "pending";

        const status = order.status?.toLowerCase();

        const statusOrder = [
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "delivered",
        ];

        const currentIndex = statusOrder.indexOf(status);

        const stepIndexes = {
            placed: 0,
            accepted: 1,
            shipped: 3,
            out_for_delivery: 3,
            delivered: 4,
        };

        const targetIndex = stepIndexes[stepName];

        if (status === "cancelled") return "cancelled";
        if (currentIndex >= targetIndex) return "completed";
        if (currentIndex === targetIndex - 1) return "current";
        return "pending";
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="page-loader">
                    Loading order details...
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

                    {/* Amazon / Flipkart Style Live Shipment Stepper */}
                    <div className="order-tracker-card">

                        <h3 className="tracker-title">Order Status</h3>

                        <div className="stepper-wrapper">

                            <div className={`stepper-step ${getStepStatus("placed")}`}>
                                <div className="step-icon">
                                    <Clock size={18} />
                                </div>
                                <div className="step-content">
                                    <span className="step-label">Order Placed</span>
                                    <span className="step-sub">{formatDate(order.created_at)}</span>
                                </div>
                            </div>

                            <div className="stepper-line" />

                            <div className={`stepper-step ${getStepStatus("accepted")}`}>
                                <div className="step-icon">
                                    <CheckCircle2 size={18} />
                                </div>
                                <div className="step-content">
                                    <span className="step-label">Order Accepted</span>
                                    <span className="step-sub">
                                        {order.status === "pending" ? "Awaiting Admin Approval" : "Accepted by 3Seven Studio"}
                                    </span>
                                </div>
                            </div>

                            <div className="stepper-line" />

                            <div className={`stepper-step ${getStepStatus("shipped")}`}>
                                <div className="step-icon">
                                    <Truck size={18} />
                                </div>
                                <div className="step-content">
                                    <span className="step-label">Shipped (Envia Road)</span>
                                    <span className="step-sub">
                                        {order.courier_name || (order.tracking_number ? "In Transit" : "Preparing Shipment")}
                                    </span>
                                </div>
                            </div>

                            <div className="stepper-line" />

                            <div className={`stepper-step ${getStepStatus("delivered")}`}>
                                <div className="step-icon">
                                    <CheckCheck size={18} />
                                </div>
                                <div className="step-content">
                                    <span className="step-label">Delivered</span>
                                    <span className="step-sub">
                                        {order.status === "delivered" ? "Delivered" : "Est. Road Delivery 3-5 Days"}
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Shipment Details Box */}
                        {order.tracking_number && (

                            <div className="shipment-info-box">

                                <div className="shipment-info-left">

                                    <span className="courier-badge">
                                        <Truck size={14} />
                                        {order.courier_name || "Envia Surface Road Delivery"}
                                    </span>

                                    <div className="tracking-number-row">
                                        <span>Tracking ID: <strong>{order.tracking_number}</strong></span>

                                        <button
                                            className="copy-btn"
                                            onClick={handleCopyTracking}
                                            title="Copy Tracking Number"
                                        >
                                            <Copy size={14} />
                                            {copied ? "Copied" : "Copy"}
                                        </button>
                                    </div>

                                </div>

                                <div className="shipment-info-right">

                                    {order.tracking_url && (
                                        <a
                                            href={order.tracking_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="track-link-btn"
                                        >
                                            Track Shipment
                                            <ExternalLink size={14} />
                                        </a>
                                    )}

                                    {order.shipping_label && (
                                        <a
                                            href={order.shipping_label}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="label-link-btn"
                                        >
                                            <FileText size={14} />
                                            Shipping Label
                                        </a>
                                    )}

                                </div>

                            </div>

                        )}

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