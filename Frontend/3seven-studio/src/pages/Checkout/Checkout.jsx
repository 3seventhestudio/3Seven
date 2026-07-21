import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";

import CheckoutAddress from "../../components/checkout/CheckoutAddress/CheckoutAddress";
import ShippingMethod from "../../components/checkout/ShippingMethod/ShippingMethod";
import PaymentMethod from "../../components/checkout/PaymentMethod/PaymentMethod";
import CheckoutSummary from "../../components/checkout/CheckoutSummary/CheckoutSummary";

import { CheckoutProvider } from "../../context/CheckoutContext";

import "./Checkout.css";

function CheckoutContent() {
    return (
        <section className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-left">
                    <CheckoutAddress />

                    <ShippingMethod />

                    <PaymentMethod />
                </div>

                <div className="checkout-right">
                    <CheckoutSummary />
                </div>
            </div>
        </section>
    );
}

function Checkout() {
    return (
        <>
            <Navbar />

            <Breadcrumb
                items={[
                    { label: "Home", link: "/" },
                    { label: "Cart", link: "/cart" },
                    { label: "Checkout" },
                ]}
            />

            <CheckoutProvider>
                <CheckoutContent />
            </CheckoutProvider>

            <Footer />
        </>
    );
}

export default Checkout;