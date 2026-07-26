import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    createCoupon,
} from "../../../services/admin/couponService";

const CouponCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
        discount_type: "percentage",
        discount_value: "",
        maximum_discount: "",
        minimum_order_amount: "",
        start_date: "",
        end_date: "",
        usage_limit: 0,
        usage_per_user: 1,
        first_order_only: false,
        is_active: true,
        applicable_categories: [],
        applicable_products: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createCoupon(formData);
            navigate("/admin/coupons");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="admin-page">

            <PageHeader
                title="Create Coupon"
                subtitle="Create a new discount coupon"
            />

            <div className="admin-card">

                <form
                    className="admin-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Coupon Code</label>
                            <input
                                className="form-control"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Discount Type</label>

                            <select
                                className="form-control"
                                name="discount_type"
                                value={formData.discount_type}
                                onChange={handleChange}
                            >
                                <option value="percentage">
                                    Percentage
                                </option>

                                <option value="fixed">
                                    Fixed Amount
                                </option>

                                <option value="free_shipping">
                                    Free Shipping
                                </option>

                            </select>

                        </div>

                        <div className="form-group">
                            <label>Discount Value</label>

                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                name="discount_value"
                                value={formData.discount_value}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">
                            <label>Maximum Discount</label>

                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                name="maximum_discount"
                                value={formData.maximum_discount}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">
                            <label>Minimum Order Amount</label>

                            <input
                                type="number"
                                step="0.01"
                                className="form-control"
                                name="minimum_order_amount"
                                value={formData.minimum_order_amount}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">
                            <label>Start Date</label>

                            <input
                                type="datetime-local"
                                className="form-control"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">
                            <label>End Date</label>

                            <input
                                type="datetime-local"
                                className="form-control"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">
                            <label>Usage Limit</label>

                            <input
                                type="number"
                                className="form-control"
                                name="usage_limit"
                                value={formData.usage_limit}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-group">
                            <label>Usage Per User</label>

                            <input
                                type="number"
                                className="form-control"
                                name="usage_per_user"
                                value={formData.usage_per_user}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="checkbox-group">

                        <label>

                            <input
                                type="checkbox"
                                name="first_order_only"
                                checked={formData.first_order_only}
                                onChange={handleChange}
                            />

                            First Order Only

                        </label>

                        <label>

                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                            />

                            Active

                        </label>

                    </div>

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Create Coupon
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CouponCreate;