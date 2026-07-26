import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CouponForm from "../../../components/admin/coupons/CouponForm";
import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    getCoupon,
    updateCoupon,
} from "../../../services/admin/couponService";

const CouponEdit = () => {
    const { couponId } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [coupon, setCoupon] = useState(null);

    useEffect(() => {
        fetchCoupon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [couponId]);

    const fetchCoupon = async () => {
        try {
            setLoading(true);

            const response = await getCoupon(couponId);

            setCoupon(response.data);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to load coupon."
            );

            navigate("/admin/coupons");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            await updateCoupon(
                couponId,
                values
            );

            toast.success(
                "Coupon updated successfully."
            );

            navigate("/admin/coupons");
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to update coupon."
            );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <span className="text-gray-500">
                    Loading coupon...
                </span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Edit Coupon"
                subtitle="Update coupon details."
            />

            <CouponForm
                initialValues={coupon}
                onSubmit={handleSubmit}
                isEdit
            />
        </div>
    );
};

export default CouponEdit;