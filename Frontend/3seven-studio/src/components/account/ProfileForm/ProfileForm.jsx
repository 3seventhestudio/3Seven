import { useEffect, useState } from "react";

import "./ProfileForm.css";

function ProfileForm({
    profile,
    editing,
    saving,
    onSave,
    onCancel,
}) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        gender: "",
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name || "",
                last_name: profile.last_name || "",
                email: profile.email || "",
                phone_number: profile.phone_number || "",
                date_of_birth: profile.date_of_birth || "",
                gender: profile.gender || "",
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!editing) {
        return (
            <div className="profile-view">

                <div className="profile-row">
                    <label>First Name</label>
                    <span>{profile.first_name || "-"}</span>
                </div>

                <div className="profile-row">
                    <label>Last Name</label>
                    <span>{profile.last_name || "-"}</span>
                </div>

                <div className="profile-row">
                    <label>Email</label>
                    <span>{profile.email}</span>
                </div>

                <div className="profile-row">
                    <label>Phone Number</label>
                    <span>{profile.phone_number || "-"}</span>
                </div>

                <div className="profile-row">
                    <label>Date of Birth</label>
                    <span>{profile.date_of_birth || "-"}</span>
                </div>

                <div className="profile-row">
                    <label>Gender</label>
                    <span>{profile.gender || "-"}</span>
                </div>

            </div>
        );
    }

    return (
        <form
            className="profile-form"
            onSubmit={handleSubmit}
        >

            <div className="form-grid">

                <input
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                />

                <input
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    value={formData.email}
                    disabled
                />

                <input
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

            </div>

            <div className="profile-actions">

                <button
                    type="submit"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

            </div>

        </form>
    );
}

export default ProfileForm;