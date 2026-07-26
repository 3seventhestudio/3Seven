import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { checkout } from "../../../services/orderService";
import {
    createRazorpayOrder,
    verifyRazorpayPayment,
    loadRazorpayScript,
} from "../../../services/paymentService";
import { useCheckout } from "../../../context/CheckoutContext";
import { useCart } from "../../../context/CartContext";

import "./CheckoutSummary.css";

const CheckoutSummary = () => {
    const navigate = useNavigate();

    const {
        selectedAddress,
        paymentMethod,
        notes,
        placingOrder,
        setPlacingOrder,
    } = useCheckout();

    const {
        subtotal,
        shippingCharge,
        codCharge,
        gst,
        discount,
        grandTotal,
        cartCount,
        loadCart,
        ensureBackendCartSynced,
    } = useCart();

    const [error, setError] = useState("");

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(Number(value));

    const handlePlaceOrder = async () => {
        setError("");

        if (!selectedAddress) {
            setError("Please select a delivery address.");
            return;
        }

        if (!paymentMethod) {
            setError("Please select a payment method.");
            return;
        }

        if (cartCount === 0) {
            setError("Your cart is empty.");
            return;
        }

        try {
            setPlacingOrder(true);

            // Ensure items are synced to backend cart before placing order
            await ensureBackendCartSynced();

            // 1. Create order on backend
            const order = await checkout({
                address_id: selectedAddress.id,
                payment_method: paymentMethod,
                notes,
            });

            // 2. If Cash on Delivery, finish order immediately
            if (paymentMethod === "cod") {
                toast.success("Order placed successfully!");
                loadCart();
                navigate(`/orders/success/${order.order_number}`, { replace: true });
                return;
            }

            // 3. Online payment via Razorpay
            const scriptLoaded = await loadRazorpayScript();

            if (!scriptLoaded) {
                setError("Failed to load Razorpay SDK. Please check your connection.");
                setPlacingOrder(false);
                return;
            }

            // Create Razorpay order on backend
            const rzpData = await createRazorpayOrder(order.order_number);

            const options = {
                key: rzpData.key_id,
                amount: rzpData.amount,
                currency: rzpData.currency,
                name: "3Seven Studio",
                description: `Payment for Order ${rzpData.order_number}`,
                order_id: rzpData.razorpay_order_id,
                prefill: {
                    name: rzpData.user_name,
                    email: rzpData.user_email,
                    contact: rzpData.user_phone,
                },
                theme: {
                    color: "#111111",
                },
                handler: async function (response) {
                    try {
                        await verifyRazorpayPayment({
                            order_number: rzpData.order_number,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        toast.success("Payment successful! Order confirmed.");
                        loadCart();
                        navigate(`/orders/success/${rzpData.order_number}`, { replace: true });
                    } catch (verifyErr) {
                        console.error(verifyErr);
                        toast.error("Payment verification failed. Please contact support.");
                        setError("Payment verification failed. Please contact support.");
                    } finally {
                        setPlacingOrder(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setPlacingOrder(false);
                        toast.info("Payment cancelled. Order remains saved as pending.");
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response) {
                console.error("Razorpay Payment Failed:", response.error);
                toast.error(`Payment failed: ${response.error.description || "Transaction declined."}`);
                setError(`Payment failed: ${response.error.description || "Transaction declined."}`);
                setPlacingOrder(false);
            });

            rzp.open();

        } catch (err) {
            console.error(err);
            setError(
                err?.response?.data?.message ||
                "Unable to place your order. Please try again."
            );
            setPlacingOrder(false);
        }
    };

    return (
        <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
                <span>Items</span>
                <span>{cartCount}</span>
            </div>

            <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="summary-row">
                <span>Shipping</span>
                <span>{formatCurrency(shippingCharge)}</span>
            </div>

            {paymentMethod === "cod" && codCharge > 0 && (
                <div className="summary-row">
                    <span>COD Charges</span>
                    <span>{formatCurrency(codCharge)}</span>
                </div>
            )}

            <div className="summary-row">
                <span>GST</span>
                <span>{formatCurrency(gst)}</span>
            </div>

            {discount > 0 && (
                <div className="summary-row discount">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                </div>
            )}

            <hr />

            <div className="summary-row total">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
            </div>

            {error && (
                <div className="checkout-error">
                    {error}
                </div>
            )}

            <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={placingOrder || cartCount === 0}
            >
                {placingOrder
                    ? (paymentMethod === "cod" ? "Placing Order..." : "Processing Payment...")
                    : (paymentMethod === "cod" ? "Place Order" : "Proceed to Pay")}
            </button>
        </aside>
    );
};

export default CheckoutSummary;