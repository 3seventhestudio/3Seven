import { useEffect, useState } from "react";

import AccountLayout from "../../../components/account/AccountLayout/AccountLayout";

import AddressCard from "../../../components/account/AddressCard/AddressCard";
import AddressModal from "../../../components/account/AddressModal/AddressModal";

import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "../../../services/addressService";

import "./ManageAddresses.css";

function ManageAddresses() {

    const [addresses, setAddresses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingAddress, setEditingAddress] = useState(null);

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getAddresses();

            setAddresses(data || []);

        } catch (err) {

            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Unable to load addresses."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleAdd = () => {

        setEditingAddress(null);

        setShowModal(true);

    };

    const handleEdit = (address) => {

        setEditingAddress(address);

        setShowModal(true);

    };

    const handleSave = async (payload) => {

        try {

            if (editingAddress) {

                await updateAddress(
                    editingAddress.id,
                    payload
                );

            } else {
                console.log("Payload being sent:", payload)
                await createAddress(payload);

            }

            setShowModal(false);

            loadAddresses();

        } catch (err) {

    console.error("Full Error:", err);

    console.log("Status:", err.response?.status);

    console.log("Response Data:", err.response?.data);

    alert(
        JSON.stringify(err.response?.data, null, 2)
    );

}

    };

    const handleDelete = async (addressId) => {

        if (
            !window.confirm(
                "Delete this address?"
            )
        ) {
            return;
        }

        try {

            await deleteAddress(addressId);

            loadAddresses();

        } catch (err) {

            console.error(err);

            alert(
                err?.response?.data?.message ||
                "Unable to delete address."
            );

        }

    };

    const handleDefault = async (addressId) => {

        try {

            await setDefaultAddress(addressId);

            loadAddresses();

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <AccountLayout title="My Addresses">

            <div className="addresses-page">

                <div className="addresses-header">

                    <div>

                        <h2>
                            Saved Addresses
                        </h2>

                        <p>
                            Manage your delivery addresses.
                        </p>

                    </div>

                    <button
                        className="add-address-btn"
                        onClick={handleAdd}
                    >
                        + Add Address
                    </button>

                </div>

                {loading && (

                    <div className="address-loading">

                        Loading...

                    </div>

                )}

                {!loading && error && (

                    <div className="address-error">

                        {error}

                    </div>

                )}

                {!loading &&
                    !error &&
                    addresses.length === 0 && (

                        <div className="address-empty">

                            No addresses found.

                        </div>

                    )}

                <div className="address-grid">

                    {addresses.map(address => (

                        <AddressCard
                            key={address.id}
                            address={address}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onDefault={handleDefault}
                        />

                    ))}

                </div>

            </div>

            <AddressModal
                open={showModal}
                address={editingAddress}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
            />

        </AccountLayout>

    );

}

export default ManageAddresses;