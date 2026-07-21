import { useEffect, useState } from "react";

import "./AddressForm.css";

function AddressForm({
    address,
    onSave,
    onCancel,
    saving = false,
}) {

    const [formData, setFormData] = useState({
        full_name: "",
        phone_number: "",
        address_type: "HOME",
        address_line_1: "",
        address_line_2: "",
        landmark: "",
        city: "",
        state: "",
        postal_code: "",
        country: "India",
        is_default: false,
    });

    useEffect(() => {

        if (address) {

            setFormData({
                full_name: address.full_name || "",
                phone_number: address.phone_number || "",
                address_type: address.address_type || "HOME",
                address_line_1: address.address_line_1 || "",
                address_line_2: address.address_line_2 || "",
                landmark: address.landmark || "",
                city: address.city || "",
                state: address.state || "",
                postal_code: address.postal_code || "",
                country: address.country || "India",
                is_default: address.is_default || false,
            });

        } else {

            setFormData({
                full_name: "",
                phone_number: "",
                address_type: "HOME",
                address_line_1: "",
                address_line_2: "",
                landmark: "",
                city: "",
                state: "",
                postal_code: "",
                country: "India",
                is_default: false,
            });

        }

    }, [address]);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

    };

    return (

        <form
            className="address-form"
            onSubmit={handleSubmit}
        >

            <div className="address-grid">

                <input
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                />

                <select
                    name="address_type"
                    value={formData.address_type}
                    onChange={handleChange}
                >
                    <option value="HOME">Home</option>
                    <option value="WORK">Office</option>
                    <option value="OTHER">Other</option>
                </select>

                <input
                    name="address_line_1"
                    placeholder="Address Line 1"
                    value={formData.address_line_1}
                    onChange={handleChange}
                    required
                />

                <input
                    name="address_line_2"
                    placeholder="Address Line 2"
                    value={formData.address_line_2}
                    onChange={handleChange}
                />

                <input
                    name="landmark"
                    placeholder="Landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                />

                <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />

                <input
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />

                <input
                    name="postal_code"
                    placeholder="Postal Code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    required
                />

                <input
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                />

            </div>

            <label className="default-checkbox">

                <input
                    type="checkbox"
                    name="is_default"
                    checked={formData.is_default}
                    onChange={handleChange}
                />

                Make Default Address

            </label>

            <div className="address-actions">

                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={saving}
                >
                    {saving
                        ? "Saving..."
                        : "Save Address"}
                </button>

            </div>

        </form>

    );

}

export default AddressForm;