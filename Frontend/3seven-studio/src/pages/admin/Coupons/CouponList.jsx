import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    getCoupons,
    deleteCoupon,
} from "../../../services/admin/couponService";

const CouponList = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCoupons();
    }, []);

    const loadCoupons = async () => {
        try {
            setLoading(true);

            const response = await getCoupons();

            setCoupons(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this coupon?")) {
            return;
        }

        try {
            await deleteCoupon(id);
            loadCoupons();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div className="loading-state">Loading...</div>;
    }

    return (
        <div className="admin-page">

            <PageHeader
                title="Coupons"
                subtitle="Manage discount coupons"
            />

            <div className="admin-card">

                <div className="card-header">

                    <Link
                        to="/admin/coupons/create"
                        className="btn btn-primary"
                    >
                        Add Coupon
                    </Link>

                </div>

                <div className="table-responsive">

                    <table className="admin-table">

                        <thead>

                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Value</th>
                                <th>Minimum Order</th>
                                <th>Usage</th>
                                <th>Status</th>
                                <th width="170">Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {coupons.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="empty-state"
                                    >
                                        No coupons found.
                                    </td>
                                </tr>
                            )}

                            {coupons.map((coupon) => (
                                <tr key={coupon.id}>

                                    <td>{coupon.code}</td>

                                    <td>{coupon.name}</td>

                                    <td>{coupon.discount_type}</td>

                                    <td>
                                        {coupon.discount_value}
                                    </td>

                                    <td>
                                        {coupon.minimum_order_amount}
                                    </td>

                                    <td>
                                        {coupon.total_usage}
                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                coupon.is_active
                                                    ? "badge-success"
                                                    : "badge-danger"
                                            }`}
                                        >
                                            {coupon.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <Link
                                                to={`/admin/coupons/${coupon.id}`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    handleDelete(
                                                        coupon.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default CouponList;