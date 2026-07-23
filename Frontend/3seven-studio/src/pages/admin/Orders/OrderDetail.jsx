import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    getOrder,
    updateOrder,
} from "../../../services/admin/orderService";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);

    const [formData, setFormData] = useState({
        status: "",
        payment_status: "",
        tracking_number: "",
        tracking_url: "",
        courier_name: "",
        courier_service: "",
        shipping_provider: "",
        shipment_id: "",
        shipping_label: "",
        notes: "",
    });

    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = async () => {
        try {
            const response = await getOrder(id);

            setOrder(response.data);

            setFormData({
                status: response.data.status,
                payment_status: response.data.payment_status,
                tracking_number: response.data.tracking_number || "",
                tracking_url: response.data.tracking_url || "",
                courier_name: response.data.courier_name || "",
                courier_service: response.data.courier_service || "",
                shipping_provider: response.data.shipping_provider || "",
                shipment_id: response.data.shipment_id || "",
                shipping_label: response.data.shipping_label || "",
                notes: response.data.notes || "",
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateOrder(id, formData);
            navigate("/admin/orders");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <PageHeader
                title={order.order_number}
                subtitle="Order Details"
            />

            <div className="card">

                <h4>Customer</h4>

                <p>
                    <strong>Name:</strong> {order.customer.name}
                </p>

                <p>
                    <strong>Email:</strong> {order.customer.email}
                </p>

                <p>
                    <strong>Phone:</strong> {order.customer.phone}
                </p>

                <hr />

                <h4>Items</h4>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {order.items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.product_name}</td>
                                <td>{item.sku}</td>
                                <td>{item.size}</td>
                                <td>{item.color}</td>
                                <td>{item.quantity}</td>
                                <td>₹ {item.total_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <hr />

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Status</label>

                        <select
                            className="form-control"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="returned">Returned</option>
                            <option value="refunded">Refunded</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Payment Status</label>

                        <select
                            className="form-control"
                            name="payment_status"
                            value={formData.payment_status}
                            onChange={handleChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Tracking Number</label>

                        <input
                            className="form-control"
                            name="tracking_number"
                            value={formData.tracking_number}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Tracking URL</label>

                        <input
                            className="form-control"
                            name="tracking_url"
                            value={formData.tracking_url}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Courier</label>

                        <input
                            className="form-control"
                            name="courier_name"
                            value={formData.courier_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Notes</label>

                        <textarea
                            className="form-control"
                            rows="4"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Update Order
                    </button>

                </form>

            </div>
        </>
    );
};

export default OrderDetail;