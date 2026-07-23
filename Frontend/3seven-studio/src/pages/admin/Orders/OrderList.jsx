import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import { getOrders } from "../../../services/admin/orderService";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {
        try {
            setLoading(true);

            const response = await getOrders();

            setOrders(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <PageHeader
                title="Orders"
                subtitle="Manage customer orders"
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
                                <th width="120">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="8">
                                        No orders found.
                                    </td>
                                </tr>
                            )}

                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.order_number}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.total_items}</td>
                                    <td>₹ {order.grand_total}</td>
                                    <td>{order.payment_status}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <Link
                                            className="btn btn-primary btn-sm"
                                            to={`/admin/orders/${order.id}`}
                                        >
                                            View
                                        </Link>
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