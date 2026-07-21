import { useEffect, useState } from "react";

import Navbar from "../../../components/layout/Navbar/Navbar";
import Footer from "../../../components/layout/Footer/Footer";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb";
import OrderCard from "../../../components/orders/OrderCard/OrderCard";

import { getOrders } from "../../../services/orderService";

import "./MyOrders.css";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getOrders();

            setOrders(data || []);
        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                    "Unable to load your orders."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <Breadcrumb
                items={[
                    {
                        label: "Home",
                        link: "/",
                    },
                    {
                        label: "My Orders",
                    },
                ]}
            />

            <section className="my-orders-page">

                <div className="my-orders-container">

                    <div className="page-header">
                        <h1>My Orders</h1>

                        <p>
                            View and track all your orders.
                        </p>
                    </div>

                    {loading && (
                        <div className="orders-loading">
                            Loading your orders...
                        </div>
                    )}

                    {!loading && error && (
                        <div className="orders-error">
                            {error}
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        orders.length === 0 && (
                            <div className="orders-empty">
                                <h2>No Orders Yet</h2>

                                <p>
                                    You haven't placed any orders yet.
                                </p>
                            </div>
                        )}

                    {!loading &&
                        !error &&
                        orders.length > 0 && (
                            <div className="orders-grid">

                                {orders.map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                    />
                                ))}

                            </div>
                        )}

                </div>

            </section>

            <Footer />
        </>
    );
}

export default MyOrders;