import { useState } from "react";

import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";

import CartTable from "../../components/cart/CartTable/CartTable";
import CartSummaryCard from "../../components/cart/CartSummaryCard/CartSummaryCard";
import CouponForm from "../../components/cart/CouponForm/CouponForm";

import "./Cart.css";

function Cart() {

    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const handleCouponApplied = (couponData) => {
        setAppliedCoupon(couponData);
    };

    const handleCouponRemoved = () => {
        setAppliedCoupon(null);
    };

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
                        label: "Shopping Bag",
                    },
                ]}
            />

            <section className="cart-page">

                <div className="container">

                    <div className="cart-header">

                        <h1>
                            Shopping Bag
                        </h1>

                        <p>
                            Review your items before proceeding to checkout.
                        </p>

                    </div>

                    <div className="cart-layout">

                        <div className="cart-left">

                            <CartTable />

                            <CouponForm
                                onCouponApplied={handleCouponApplied}
                                appliedCoupon={appliedCoupon}
                                onCouponRemoved={handleCouponRemoved}
                            />

                        </div>

                        <div className="cart-right">

                            <CartSummaryCard
                                appliedCoupon={appliedCoupon}
                            />

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Cart;