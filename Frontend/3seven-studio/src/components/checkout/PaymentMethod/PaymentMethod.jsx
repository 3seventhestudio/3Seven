import { Banknote, CreditCard, Smartphone, Building2 } from "lucide-react";
import { useCheckout } from "../../../context/CheckoutContext";
import "./PaymentMethod.css";

const PAYMENT_METHODS = [
    {
        id: "cod",
        title: "Cash on Delivery (COD)",
        description: "Pay in cash when your order is delivered.",
        icon: <Banknote size={24} />,
        disabled: false,
    },
    {
        id: "razorpay",
        title: "Razorpay / Online Payment",
        description: "Pay securely via Credit/Debit Card, UPI, Netbanking, or Wallets.",
        icon: <CreditCard size={24} />,
        disabled: false,
    },
    {
        id: "upi",
        title: "UPI (Google Pay / PhonePe / Paytm)",
        description: "Instant UPI payment via Razorpay.",
        icon: <Smartphone size={24} />,
        disabled: false,
    },
    {
        id: "netbanking",
        title: "Net Banking",
        description: "All major Indian banks supported.",
        icon: <Building2 size={24} />,
        disabled: false,
    },
];

const PaymentMethod = () => {
    const {
        paymentMethod,
        setPaymentMethod,
    } = useCheckout();

    return (
        <section className="payment-method">
            <div className="checkout-section-header">
                <h2>Payment Method</h2>
                <p>Select your preferred payment option.</p>
            </div>

            <div className="payment-options">
                {PAYMENT_METHODS.map((method) => {
                    const selected = paymentMethod === method.id;

                    return (
                        <label
                            key={method.id}
                            className={`payment-card ${
                                selected ? "selected" : ""
                            } ${
                                method.disabled ? "disabled" : ""
                            }`}
                        >
                            <input
                                type="radio"
                                name="payment_method"
                                value={method.id}
                                checked={selected}
                                disabled={method.disabled}
                                onChange={() =>
                                    setPaymentMethod(method.id)
                                }
                            />

                            <div className="payment-icon">
                                {method.icon}
                            </div>

                            <div className="payment-content">
                                <h3>{method.title}</h3>
                                <p>{method.description}</p>
                            </div>
                        </label>
                    );
                })}
            </div>
        </section>
    );
};

export default PaymentMethod;