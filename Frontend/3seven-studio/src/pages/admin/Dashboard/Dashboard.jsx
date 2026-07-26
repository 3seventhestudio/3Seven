import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    AlertTriangle,
    TrendingUp,
} from "lucide-react";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import StatCard from "../../../components/admin/StatCard/StatCard";
import { getDashboardStats } from "../../../services/admin/dashboardService";

function Dashboard() {

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                setLoading(true);

                const response = await getDashboardStats();

                setData(response.data);

            } catch (error) {

                console.error("Failed to load dashboard:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    const formatCurrency = (value) => {

        const num = Number(value) || 0;

        if (num >= 100000) {
            return `₹${(num / 100000).toFixed(1)}L`;
        }

        if (num >= 1000) {
            return `₹${(num / 1000).toFixed(1)}K`;
        }

        return `₹${num.toFixed(0)}`;

    };

    const getStatusColor = (status) => {

        const colors = {
            pending: "#f59e0b",
            confirmed: "#3b82f6",
            processing: "#8b5cf6",
            shipped: "#06b6d4",
            delivered: "#10b981",
            cancelled: "#ef4444",
            returned: "#f97316",
            refunded: "#6b7280",
        };

        return colors[status] || "#6b7280";

    };

    if (loading) {
        return (
            <>
                <PageHeader
                    title="Dashboard"
                    subtitle="Loading dashboard data..."
                />
                <div className="flex items-center justify-center py-20">
                    <span className="text-gray-400 text-lg">Loading...</span>
                </div>
            </>
        );
    }

    return (

        <>

            <PageHeader
                title="Dashboard"
                subtitle="Welcome to the 3Seven Studio Admin Panel"
            />

            {/* Stats Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginBottom: "32px",
                }}
            >

                <StatCard
                    title="Revenue"
                    value={data ? formatCurrency(data.total_revenue) : "₹0"}
                    icon={<DollarSign />}
                />

                <StatCard
                    title="Orders"
                    value={data?.total_orders?.toString() || "0"}
                    icon={<ShoppingBag />}
                />

                <StatCard
                    title="Customers"
                    value={data?.total_customers?.toString() || "0"}
                    icon={<Users />}
                />

                <StatCard
                    title="Products"
                    value={data?.total_products?.toString() || "0"}
                    icon={<Package />}
                />

            </div>

            {/* Content Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                }}
            >

                {/* Recent Orders */}
                <div
                    style={{
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "24px",
                    }}
                >

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                            <TrendingUp size={18} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
                            Recent Orders
                        </h3>
                        <button
                            onClick={() => navigate("/admin/orders")}
                            style={{
                                fontSize: "13px",
                                color: "#6b7280",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            View All
                        </button>
                    </div>

                    {data?.recent_orders?.length > 0 ? (

                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                    <th style={{ textAlign: "left", padding: "10px 8px", color: "#6b7280", fontWeight: "500" }}>Order</th>
                                    <th style={{ textAlign: "left", padding: "10px 8px", color: "#6b7280", fontWeight: "500" }}>Customer</th>
                                    <th style={{ textAlign: "left", padding: "10px 8px", color: "#6b7280", fontWeight: "500" }}>Status</th>
                                    <th style={{ textAlign: "right", padding: "10px 8px", color: "#6b7280", fontWeight: "500" }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recent_orders.map((order, index) => (
                                    <tr key={index} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                        <td style={{ padding: "12px 8px", fontWeight: "500" }}>
                                            {order.order_number}
                                        </td>
                                        <td style={{ padding: "12px 8px", color: "#6b7280" }}>
                                            {order.customer_email}
                                        </td>
                                        <td style={{ padding: "12px 8px" }}>
                                            <span style={{
                                                display: "inline-block",
                                                padding: "2px 10px",
                                                borderRadius: "9999px",
                                                fontSize: "12px",
                                                fontWeight: "500",
                                                background: `${getStatusColor(order.status)}15`,
                                                color: getStatusColor(order.status),
                                                textTransform: "capitalize",
                                            }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 8px", textAlign: "right", fontWeight: "500" }}>
                                            ₹{Number(order.grand_total).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    ) : (

                        <p style={{ color: "#9ca3af", textAlign: "center", padding: "24px 0" }}>
                            No orders yet.
                        </p>

                    )}

                </div>

                {/* Low Stock Alerts */}
                <div
                    style={{
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "24px",
                    }}
                >

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                            <AlertTriangle size={18} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle", color: "#f59e0b" }} />
                            Low Stock Alerts
                        </h3>
                        <button
                            onClick={() => navigate("/admin/inventory")}
                            style={{
                                fontSize: "13px",
                                color: "#6b7280",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            View Inventory
                        </button>
                    </div>

                    {data?.low_stock?.length > 0 ? (

                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                    <th style={{ textAlign: "left", padding: "10px 8px", color: "#6b7280", fontWeight: "500" }}>Product</th>
                                    <th style={{ textAlign: "left", padding: "10px 8px", color: "#6b7280", fontWeight: "500" }}>Variant</th>
                                    <th style={{ textAlign: "right", padding: "10px 8px", color: "#6b7280", fontWeight: "500" }}>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.low_stock.map((item, index) => (
                                    <tr key={index} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                        <td style={{ padding: "12px 8px", fontWeight: "500" }}>
                                            {item.product_name}
                                        </td>
                                        <td style={{ padding: "12px 8px", color: "#6b7280" }}>
                                            {item.size}{item.color ? ` / ${item.color}` : ""}
                                        </td>
                                        <td style={{ padding: "12px 8px", textAlign: "right" }}>
                                            <span style={{
                                                display: "inline-block",
                                                padding: "2px 10px",
                                                borderRadius: "9999px",
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                background: item.stock_quantity === 0 ? "#fee2e2" : "#fef3c7",
                                                color: item.stock_quantity === 0 ? "#dc2626" : "#d97706",
                                            }}>
                                                {item.stock_quantity}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    ) : (

                        <p style={{ color: "#10b981", textAlign: "center", padding: "24px 0" }}>
                            ✓ All products have sufficient stock.
                        </p>

                    )}

                </div>

            </div>

            {/* Orders By Status */}
            {data?.orders_by_status && Object.keys(data.orders_by_status).length > 0 && (

                <div
                    style={{
                        marginTop: "24px",
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "24px",
                    }}
                >

                    <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>
                        Orders by Status
                    </h3>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                        {Object.entries(data.orders_by_status).map(([status, count]) => (
                            <div
                                key={status}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "8px 16px",
                                    background: "#f9fafb",
                                    borderRadius: "8px",
                                    border: "1px solid #e5e7eb",
                                }}
                            >
                                <span
                                    style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        background: getStatusColor(status),
                                    }}
                                />
                                <span style={{ fontSize: "13px", textTransform: "capitalize", color: "#374151" }}>
                                    {status}
                                </span>
                                <span style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>

            )}

        </>

    );

}

export default Dashboard;