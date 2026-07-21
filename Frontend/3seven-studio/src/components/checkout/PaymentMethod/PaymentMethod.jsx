import { FaMoneyBillWave } from "react-icons/fa";
import { useCheckout } from "../../../context/CheckoutContext";
import "./PaymentMethod.css";

const PAYMENT_METHODS = [
    {
        id: "cod",
        title: "Cash on Delivery",
        description:
            "Pay in cash when your order is delivered.",
        icon: <FaMoneyBillWave />,
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