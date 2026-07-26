import { useState } from "react";
import { Tag, X, Loader } from "lucide-react";
import { applyCoupon } from "../../../services/couponService";
import { toast } from "react-toastify";

import "./CouponForm.css";

function CouponForm({ onCouponApplied, appliedCoupon, onCouponRemoved }) {

    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleApply = async (e) => {

        e.preventDefault();

        if (!code.trim()) {
            toast.error("Please enter a coupon code.");
            return;
        }

        try {

            setLoading(true);

            const response = await applyCoupon(code.trim());

            if (response.status === "success") {

                toast.success(response.message);

                if (onCouponApplied) {
                    onCouponApplied(response.data);
                }

                setCode("");

            }

        } catch (error) {

            toast.error(
                error?.response?.data?.message || "Failed to apply coupon."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleRemove = () => {

        if (onCouponRemoved) {
            onCouponRemoved();
        }

        toast.info("Coupon removed.");

    };

    if (appliedCoupon) {

        return (

            <div className="coupon-box">

                <h3>
                    <Tag size={16} />
                    Coupon Applied
                </h3>

                <div className="coupon-applied">

                    <div className="coupon-info">

                        <span className="coupon-code-badge">
                            {appliedCoupon.code}
                        </span>

                        <span className="coupon-saving">
                            You save ₹{appliedCoupon.discount}
                        </span>

                    </div>

                    <button
                        className="coupon-remove-btn"
                        onClick={handleRemove}
                        title="Remove coupon"
                    >
                        <X size={16} />
                    </button>

                </div>

            </div>

        );

    }

    return (

        <div className="coupon-box">

            <h3>
                <Tag size={16} />
                Have a Coupon?
            </h3>

            <form className="coupon-form" onSubmit={handleApply}>

                <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    disabled={loading}
                />

                <button type="submit" disabled={loading}>
                    {loading ? <Loader size={16} className="spin" /> : "Apply"}
                </button>

            </form>

        </div>

    );

}

export default CouponForm;