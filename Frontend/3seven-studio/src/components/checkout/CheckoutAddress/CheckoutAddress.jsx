import { useEffect, useState } from "react";
import { FaCheckCircle, FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { getAddresses } from "../../../services/addressService";
import { useCheckout } from "../../../context/CheckoutContext";
import "./CheckoutAddress.css";

const CheckoutAddress = () => {
    const {
        selectedAddress,
        setSelectedAddress,
    } = useCheckout();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAddresses();

            setAddresses(data || []);

            if (!selectedAddress && data?.length > 0) {
                const defaultAddress =
                    data.find((address) => address.is_default) || data[0];

                setSelectedAddress(defaultAddress);
            }
        } catch (err) {
            console.error(err);
            setError(
                err?.response?.data?.message ||
                    "Unable to load your saved addresses."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="checkout-address">
                <div className="checkout-section-header">
                    <h2>Delivery Address</h2>
                </div>

                <div className="address-loading">
                    <div className="spinner"></div>
                    <p>Loading your saved addresses...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="checkout-address">
                <div className="checkout-section-header">
                    <h2>Delivery Address</h2>
                </div>

                <div className="address-error">
                    <p>{error}</p>

                    <button
                        className="retry-btn"
                        onClick={fetchAddresses}
                    >
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    if (addresses.length === 0) {
        return (
            <section className="checkout-address">
                <div className="checkout-section-header">
                    <h2>Delivery Address</h2>
                </div>

                <div className="address-empty">
                    <FaMapMarkerAlt />

                    <h3>No Address Found</h3>

                    <p>
                        Please add a delivery address from your profile before
                        placing an order.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="checkout-address">
            <div className="checkout-section-header">
                <h2>Delivery Address</h2>
            </div>

            <div className="address-grid">
                {addresses.map((address) => {
                    const isSelected =
                        selectedAddress?.id === address.id;

                    return (
                        <div
                            key={address.id}
                            className={`address-card ${
                                isSelected ? "selected" : ""
                            }`}
                            onClick={() =>
                                setSelectedAddress(address)
                            }
                        >
                            <div className="address-top">

                                <div className="address-name">

                                    <FaHome />

                                    <div>
                                        <h3>{address.full_name}</h3>

                                        <span>
                                            {address.address_type}
                                        </span>
                                    </div>

                                </div>

                                {address.is_default && (
                                    <span className="default-badge">
                                        Default
                                    </span>
                                )}

                            </div>

                            <div className="address-body">

                                <p>
                                    {address.address_line_1}
                                </p>

                                {address.address_line_2 && (
                                    <p>{address.address_line_2}</p>
                                )}

                                {address.landmark && (
                                    <p>{address.landmark}</p>
                                )}

                                <p>
                                    {address.city},{" "}
                                    {address.state}
                                </p>

                                <p>
                                    {address.country} -{" "}
                                    {address.postal_code}
                                </p>

                                <p className="phone">
                                    {address.phone_number}
                                </p>

                            </div>

                            {isSelected && (
                                <div className="selected-icon">
                                    <FaCheckCircle />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CheckoutAddress;