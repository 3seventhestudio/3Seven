import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CouponForm from "../../../components/admin/coupons/CouponForm";
import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import { createCoupon } from "../../../services/admin/couponService";

const CouponCreate = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            await createCoupon(values);

            toast.success("Coupon created successfully.");

            navigate("/admin/coupons");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to create coupon."
            );
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Create Coupon"
                subtitle="Create and configure a new coupon."
            />

            <CouponForm
                onSubmit={handleSubmit}
                isEdit={false}
            />
        </div>
    );
};

export default CouponCreate;