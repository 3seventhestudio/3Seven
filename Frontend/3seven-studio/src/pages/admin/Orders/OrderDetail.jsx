import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Truck, CheckCircle, FileText, ShieldCheck, Tag, RefreshCw, Box } from "lucide-react";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    getOrder,
    updateOrder,
    getShippingQuotes,
    acceptAndShipOrder,
} from "../../../services/admin/orderService";

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(false);
    const [quotesLoading, setQuotesLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [shippingData, setShippingData] = useState(null);
    const [selectedCourier, setSelectedCourier] = useState(null);

    // Package dimensions state (editable by Admin)
    const [packageParams, setPackageParams] = useState({
        weight_kg: "",
        length_cm: "",
        width_cm: "",
        height_cm: "",
    });

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
    }, [id]);

    const loadOrder = async () => {
        try {
            setLoading(true);
            const response = await getOrder(id);
            const orderData = response.data;
            setOrder(orderData);

            setFormData({
                status: orderData.status,
                payment_status: orderData.payment_status,
                tracking_number: orderData.tracking_number || "",
                tracking_url: orderData.tracking_url || "",
                courier_name: orderData.courier_name || "",
                courier_service: orderData.courier_service || "",
                shipping_provider: orderData.shipping_provider || "",
                shipment_id: orderData.shipment_id || "",
                shipping_label: orderData.shipping_label || "",
                notes: orderData.notes || "",
            });

            // Fetch initial courier quotes for order destination pincode
            fetchQuotes(id, {});

        } catch (error) {
            console.error(error);
            toast.error("Failed to load order.");
        } finally {
            setLoading(false);
        }
    };

    const fetchQuotes = async (orderId, params = {}) => {
        try {
            setQuotesLoading(true);
            const res = await getShippingQuotes(orderId, params);
            if (res.data) {
                setShippingData(res.data);
                setPackageParams({
                    weight_kg: res.data.weight_kg,
                    length_cm: res.data.length_cm,
                    width_cm: res.data.width_cm,
                    height_cm: res.data.height_cm,
                });
                if (res.data.couriers?.length) {
                    setSelectedCourier(res.data.couriers[0]);
                }
            }
        } catch (e) {
            console.error("Quotes error:", e);
        } finally {
            setQuotesLoading(false);
        }
    };

    const handleRecalculateQuotes = (e) => {
        e.preventDefault();
        fetchQuotes(id, packageParams);
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
            toast.success("Order updated successfully!");
            navigate("/admin/orders");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update order.");
        }
    };

    const handleAcceptAndShip = async () => {
        if (!selectedCourier) {
            toast.error("Please select a courier service provider from the list.");
            return;
        }

        try {
            setAccepting(true);
            const response = await acceptAndShipOrder(id, {
                carrier: selectedCourier.carrier,
                service: selectedCourier.service,
                courier_name: selectedCourier.courier_name,
                weight_kg: packageParams.weight_kg,
                length_cm: packageParams.length_cm,
                width_cm: packageParams.width_cm,
                height_cm: packageParams.height_cm,
            });
            toast.success(response.message || `Order accepted & shipped via ${selectedCourier.courier_name}!`);
            await loadOrder();
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to accept and ship order.");
        } finally {
            setAccepting(false);
        }
    };

    const getLabelUrl = () => {
        if (!order) return "#";
        if (order.shipping_label && order.shipping_label.startsWith("http")) {
            return order.shipping_label;
        }
        return `http://127.0.0.1:8000/api/orders/admin/${order.id}/shipping-label/`;
    };

    if (loading) return <p style={{ padding: "40px" }}>Loading order details...</p>;

    return (
        <>
            <PageHeader
                title={order.order_number}
                subtitle="Envia Logistics & Manual Courier Selection Control Panel"
            />

            {/* Comprehensive Shipping & Manual Courier Selection Panel */}
            <div
                style={{
                    background: "#0d0d0d",
                    color: "#fff",
                    padding: "24px",
                    borderRadius: "14px",
                    marginBottom: "24px",
                    border: "1px solid #222",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "16px",
                        borderBottom: "1px solid #262626",
                        paddingBottom: "16px",
                        marginBottom: "20px",
                    }}
                >
                    <div>
                        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
                            <Truck size={22} color="#10b981" />
                            Shipping & Courier Control Panel
                        </h3>
                        <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>
                            Destination Pincode: <strong style={{ color: "#38bdf8" }}>{shippingData?.destination_pincode || order.shipping_address?.postal_code}</strong> ({shippingData?.destination_city || order.shipping_address?.city}) | Items: <strong>{shippingData?.total_items || order.items?.length}</strong>
                        </p>
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                        {order.shipping_label && (
                            <a
                                href={getLabelUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "12px 20px",
                                    background: "#2563eb",
                                    color: "#fff",
                                    borderRadius: "8px",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                <FileText size={18} />
                                Print Shipping Label (4x6 PDF)
                            </a>
                        )}

                        <button
                            onClick={handleAcceptAndShip}
                            disabled={accepting || !selectedCourier}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "12px 24px",
                                background: order.status === "shipped" || order.status === "delivered" ? "#059669" : "#10b981",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "700",
                                cursor: accepting ? "not-allowed" : "pointer",
                            }}
                        >
                            {accepting ? (
                                "Generating Label..."
                            ) : order.status === "shipped" || order.status === "delivered" ? (
                                <>
                                    <CheckCircle size={18} />
                                    Order Accepted ({order.courier_name || "Shipped"})
                                </>
                            ) : (
                                <>
                                    <ShieldCheck size={18} />
                                    Accept & Ship via {selectedCourier?.carrier ? selectedCourier.carrier.toUpperCase() : "Selected Courier"}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Section 1: Package Dimensions & Weight Inspector */}
                <form
                    onSubmit={handleRecalculateQuotes}
                    style={{
                        background: "#171717",
                        padding: "16px 20px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        border: "1px solid #262626",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#e5e7eb", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <Box size={16} color="#f59e0b" />
                            Package Dimensions & Total Weight Inspector:
                        </span>

                        <button
                            type="submit"
                            disabled={quotesLoading}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                background: "#333",
                                color: "#fff",
                                border: "1px solid #444",
                                padding: "6px 14px",
                                borderRadius: "6px",
                                fontSize: "12px",
                                fontWeight: "600",
                                cursor: quotesLoading ? "not-allowed" : "pointer",
                            }}
                        >
                            <RefreshCw size={14} className={quotesLoading ? "animate-spin" : ""} />
                            Calculate Live Courier Rates
                        </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px" }}>
                        <div>
                            <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "4px" }}>Total Weight (KG)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0.1"
                                value={packageParams.weight_kg}
                                onChange={(e) => setPackageParams({ ...packageParams, weight_kg: e.target.value })}
                                style={{ width: "100%", background: "#0d0d0d", color: "#fff", border: "1px solid #444", padding: "8px", borderRadius: "6px", fontSize: "13px" }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "4px" }}>Length (CM)</label>
                            <input
                                type="number"
                                value={packageParams.length_cm}
                                onChange={(e) => setPackageParams({ ...packageParams, length_cm: e.target.value })}
                                style={{ width: "100%", background: "#0d0d0d", color: "#fff", border: "1px solid #444", padding: "8px", borderRadius: "6px", fontSize: "13px" }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "4px" }}>Width (CM)</label>
                            <input
                                type="number"
                                value={packageParams.width_cm}
                                onChange={(e) => setPackageParams({ ...packageParams, width_cm: e.target.value })}
                                style={{ width: "100%", background: "#0d0d0d", color: "#fff", border: "1px solid #444", padding: "8px", borderRadius: "6px", fontSize: "13px" }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: "11px", color: "#9ca3af", display: "block", marginBottom: "4px" }}>Height (CM)</label>
                            <input
                                type="number"
                                value={packageParams.height_cm}
                                onChange={(e) => setPackageParams({ ...packageParams, height_cm: e.target.value })}
                                style={{ width: "100%", background: "#0d0d0d", color: "#fff", border: "1px solid #444", padding: "8px", borderRadius: "6px", fontSize: "13px" }}
                            />
                        </div>
                    </div>
                </form>

                {/* Section 2: Available Courier Rates & Manual Selection List */}
                <div>
                    <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#d1d5db", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <Tag size={16} color="#10b981" />
                        Select Preferred Courier Service Provider for Pincode {shippingData?.destination_pincode || order.shipping_address?.postal_code} ({packageParams.weight_kg || 0.5} kg):
                    </h4>

                    {quotesLoading ? (
                        <p style={{ color: "#9ca3af", fontSize: "13px", padding: "20px 0" }}>Fetching live courier quotes for {packageParams.weight_kg} kg parcel...</p>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                gap: "14px",
                            }}
                        >
                            {shippingData?.couriers?.map((courier) => {
                                const isSelected = selectedCourier?.carrier === courier.carrier && selectedCourier?.service === courier.service;

                                return (
                                    <div
                                        key={`${courier.carrier}_${courier.service}`}
                                        onClick={() => setSelectedCourier(courier)}
                                        style={{
                                            padding: "16px",
                                            borderRadius: "12px",
                                            border: isSelected ? "2px solid #10b981" : "1px solid #333",
                                            background: isSelected ? "#064e3b" : "#171717",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            position: "relative",
                                        }}
                                    >
                                        {courier.is_lowest && (
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: "-10px",
                                                    right: "12px",
                                                    background: "#10b981",
                                                    color: "#fff",
                                                    fontSize: "10px",
                                                    fontWeight: "800",
                                                    padding: "2px 8px",
                                                    borderRadius: "999px",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.5px",
                                                }}
                                            >
                                                Lowest Price
                                            </span>
                                        )}

                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                                            <input
                                                type="radio"
                                                name="courier_selection"
                                                checked={isSelected}
                                                onChange={() => setSelectedCourier(courier)}
                                                style={{ accentColor: "#10b981", width: "16px", height: "16px" }}
                                            />
                                            <span style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>
                                                {courier.courier_name}
                                            </span>
                                        </div>

                                        <div style={{ fontSize: "18px", fontWeight: "800", color: "#10b981", margin: "6px 0 4px 24px" }}>
                                            ₹ {courier.price.toFixed(2)}
                                        </div>

                                        <div style={{ fontSize: "12px", color: "#9ca3af", marginLeft: "24px" }}>
                                            Est: {courier.estimated_days}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

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

                <h4>Items ({order.items?.length})</h4>

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
                        <label>Selected Courier</label>

                        <input
                            className="form-control"
                            name="courier_name"
                            value={formData.courier_name}
                            onChange={handleChange}
                            placeholder="e.g. Delhivery Surface (Road)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Tracking Number (AWB)</label>

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
                        <label>Shipping Label Link</label>

                        <input
                            className="form-control"
                            name="shipping_label"
                            value={formData.shipping_label}
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