import { useEffect, useState } from "react";
import { FaCheckCircle, FaHome, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { getAddresses, createAddress } from "../../../services/addressService";
import { useCheckout } from "../../../context/CheckoutContext";
import AddressModal from "../../account/AddressModal/AddressModal";
import "./CheckoutAddress.css";

const CheckoutAddress = () => {
    const {
        selectedAddress,
        setSelectedAddress,
    } = useCheckout();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSaveAddress = async (payload) => {
        try {
            setSaving(true);
            const newAddress = await createAddress(payload);
            setAddresses((prev) => [...prev, newAddress]);
            setSelectedAddress(newAddress);
            setShowModal(false);
        } catch (err) {
            console.error(err);
            alert(
                err?.response?.data?.message ||
                "Unable to add new address."
            );
        } finally {
            setSaving(false);
        }
    };

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
                <div className="checkout-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2>Delivery Address</h2>
                    <button
                        className="add-address-btn"
                        onClick={() => setShowModal(true)}
                        style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "1px solid var(--color-primary)", padding: "8px 16px", borderRadius: "var(--radius-sm)", cursor: "pointer", color: "var(--color-primary)", fontWeight: "600" }}
                    >
                        <FaPlus /> Add Address
                    </button>
                </div>

                <div className="address-empty">
                    <FaMapMarkerAlt />

                    <h3>No Address Found</h3>

                    <p style={{ marginBottom: "20px" }}>
                        Please add a delivery address to complete your order.
                    </p>

                    <button
                        className="add-address-btn"
                        onClick={() => setShowModal(true)}
                        style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--color-primary)", border: "none", padding: "12px 24px", borderRadius: "var(--radius-sm)", cursor: "pointer", color: "white", fontWeight: "600" }}
                    >
                        <FaPlus /> Add New Address
                    </button>
                </div>

                <AddressModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveAddress}
                    saving={saving}
                />
            </section>
        );
    }

    return (
        <section className="checkout-address">
            <div className="checkout-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2>Delivery Address</h2>
                <button
                    className="add-address-btn"
                    onClick={() => setShowModal(true)}
                    style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "1px solid var(--color-primary)", padding: "8px 16px", borderRadius: "var(--radius-sm)", cursor: "pointer", color: "var(--color-primary)", fontWeight: "600" }}
                >
                    <FaPlus /> Add New
                </button>
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

            <AddressModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSaveAddress}
                saving={saving}
            />
        </section>
    );
};

export default CheckoutAddress;