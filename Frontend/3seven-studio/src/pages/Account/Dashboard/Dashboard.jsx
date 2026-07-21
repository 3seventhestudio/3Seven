import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaShoppingBag,
    FaClock,
    FaMapMarkerAlt,
    FaUserEdit,
    FaLock,
    FaUser
} from "react-icons/fa";

import AccountLayout from "../../../components/account/AccountLayout/AccountLayout";
import DashboardCard from "../../../components/account/DashboardCard/DashboardCard";

import { getDashboard } from "../../../services/accountService";

import "./Dashboard.css";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getDashboard();

            setDashboard(data);
        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Unable to load dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AccountLayout title="Dashboard">
                <div className="dashboard-loading">
                    Loading dashboard...
                </div>
            </AccountLayout>
        );
    }

    if (error) {
        return (
            <AccountLayout title="Dashboard">
                <div className="dashboard-error">
                    {error}
                </div>
            </AccountLayout>
        );
    }

    return (
        <AccountLayout title="Dashboard">

            <div className="dashboard-welcome">

                <h2>
                    Welcome back, {dashboard.profile.first_name} 👋
                </h2>

                <p>
                    Here's a quick overview of your account.
                </p>

            </div>

            <div className="dashboard-stats">

                <DashboardCard
                    title="Total Orders"
                    value={dashboard.stats.total_orders}
                    subtitle="Orders placed"
                    icon={<FaShoppingBag />}
                />

                <DashboardCard
                    title="Pending Orders"
                    value={dashboard.stats.pending_orders}
                    subtitle="Awaiting processing"
                    icon={<FaClock />}
                />

                <DashboardCard
                    title="Saved Addresses"
                    value={dashboard.stats.saved_addresses}
                    subtitle="Delivery Addresses"
                    icon={<FaMapMarkerAlt />}
                />

            </div>

            <div className="dashboard-grid">

                <section className="dashboard-section">

                    <h3>Recent Orders</h3>

                    {dashboard.recent_orders.length === 0 ? (

                        <div className="dashboard-empty">
                            No recent orders found.
                        </div>

                    ) : (

                        dashboard.recent_orders.map((order) => (

                            <Link
                                key={order.id}
                                to={`/orders/${order.order_number}`}
                                className="recent-order"
                            >

                                <div>

                                    <strong>
                                        {order.order_number}
                                    </strong>

                                    <p>
                                        {order.status}
                                    </p>

                                </div>

                                <strong>
                                    ₹{order.grand_total}
                                </strong>

                            </Link>

                        ))

                    )}

                </section>

                <section className="dashboard-section">

                    <h3>Quick Actions</h3>

                    <div className="quick-actions">

                        <Link
                            to="/account/profile"
                            className="quick-action"
                        >
                            <FaUserEdit />
                            Edit Profile
                        </Link>

                        <Link
                            to="/account/addresses"
                            className="quick-action"
                        >
                            <FaMapMarkerAlt />
                            Manage Addresses
                        </Link>

                        <Link
                            to="/account/change-password"
                            className="quick-action"
                        >
                            Change Password
                        </Link>

                        <Link
                            to="/orders"
                            className="quick-action"
                        >
                            <FaShoppingBag />
                            My Orders
                        </Link>

                        <Link
                            to="/shop"
                            className="quick-action"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </section>

            </div>

        </AccountLayout>
    );
}

export default Dashboard;