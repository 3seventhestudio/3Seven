import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Truck, CheckCircle, Eye, FileText } from "lucide-react";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import { getOrders, acceptAndShipOrder } from "../../../services/admin/orderService";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState({});

    const loadOrders = async () => {
        try {
            setLoading(true);
            const response = await getOrders();
            setOrders(response.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load orders.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleAcceptAndShip = async (orderId) => {
        try {
            setActionLoading(prev => ({ ...prev, [orderId]: true }));
            const res = await acceptAndShipOrder(orderId);
            toast.success(res.message || "Order accepted & Envia road shipping label generated!");
            await loadOrders();
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to accept and ship order.");
        } finally {
            setActionLoading(prev => ({ ...prev, [orderId]: false }));
        }
    };

    if (loading) {
        return <p style={{ padding: "40px" }}>Loading orders...</p>;
    }

    return (
        <>
            <PageHeader
                title="Orders Management"
                subtitle="Accept customer orders, auto-select lowest-cost Envia road courier, and print labels"
            />

            <div className="card">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th width="220">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                                        No orders found.
                                    </td>
                                </tr>
                            )}

                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>
                                        <strong>{order.order_number}</strong>
                                        {order.tracking_number && (
                                            <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "2px" }}>
                                                Trk: {order.tracking_number}
                                            </div>
                                        )}
                                    </td>
                                    <td>{order.customer}</td>
                                    <td>{order.total_items}</td>
                                    <td>₹ {order.grand_total}</td>
                                    <td>
                                        <span style={{
                                            padding: "4px 8px",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            background: order.payment_status === "paid" ? "#d1fae5" : "#feefc3",
                                            color: order.payment_status === "paid" ? "#065f46" : "#b45309",
                                        }}>
                                            {order.payment_status?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{
                                            padding: "4px 8px",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            background: order.status === "shipped" ? "#dbeafe" : order.status === "pending" ? "#fef3c7" : "#e5e7eb",
                                            color: order.status === "shipped" ? "#1e40af" : order.status === "pending" ? "#92400e" : "#374151",
                                        }}>
                                            {order.status?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                            <Link
                                                className="btn btn-secondary btn-sm"
                                                to={`/admin/orders/${order.id}`}
                                                style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                                            >
                                                <Eye size={14} />
                                                View
                                            </Link>

                                            {(order.status === "pending" || order.status === "confirmed" || order.status === "processing") && (
                                                <button
                                                    onClick={() => handleAcceptAndShip(order.id)}
                                                    disabled={actionLoading[order.id]}
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "4px",
                                                        padding: "6px 10px",
                                                        fontSize: "12px",
                                                        fontWeight: "600",
                                                        background: "#10b981",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                        cursor: actionLoading[order.id] ? "not-allowed" : "pointer",
                                                    }}
                                                    title="Accept order and generate Envia road delivery label"
                                                >
                                                    <Truck size={14} />
                                                    {actionLoading[order.id] ? "Envia..." : "Accept & Ship"}
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default OrderList;