import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { checkout } from "../../../services/orderService";
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

            const order = await checkout({
                address_id: selectedAddress.id,
                payment_method: paymentMethod,
                notes,
            });
            
            navigate(`/orders/success/${order.order_number}`,
                {
                    replace: true,
                }
            );
            loadCart();
        } catch (err) {
            console.error(err);
            
            setError(
                err?.response?.data?.message ||
                "Unable to place your order. Please try again."
            );
        } finally {
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

            <div className="summary-row">
                <span>COD Charges</span>
                <span>{formatCurrency(codCharge)}</span>
            </div>

            <div className="summary-row">
                <span>GST</span>
                <span>{formatCurrency(gst)}</span>
            </div>

            {discount > 0 && (
                <div className="summary-row discount">
                    <span>Discount</span>
                    <span>
                        -{formatCurrency(discount)}
                    </span>
                </div>
            )}

            <hr />

            <div className="summary-row total">
                <span>Total</span>
                <span>
                    {formatCurrency(grandTotal)}
                </span>
            </div>

            {error && (
                <div className="checkout-error">
                    {error}
                </div>
            )}

            <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={
                    placingOrder ||
                    cartCount === 0
                }
            >
                {placingOrder
                    ? "Placing Order..."
                    : "Place Order"}
            </button>

        </aside>
    );
};

export default CheckoutSummary;