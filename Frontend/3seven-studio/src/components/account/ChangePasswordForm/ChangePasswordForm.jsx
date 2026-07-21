import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./ChangePasswordForm.css";

function ChangePasswordForm({
    onSubmit,
    loading = false,
}) {

    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const togglePassword = (field) => {

        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        setError("");

        if (
            formData.new_password !==
            formData.confirm_password
        ) {
            setError("Passwords do not match.");
            return;
        }

        if (
            formData.new_password.length < 8
        ) {
            setError(
                "Password must be at least 8 characters."
            );
            return;
        }

        onSubmit(formData, setError);

    };

    const renderPasswordField = (
        name,
        label,
        visibleKey
    ) => (

        <div className="password-group">

            <label>{label}</label>

            <div className="password-input">

                <input
                    type={
                        showPassword[visibleKey]
                            ? "text"
                            : "password"
                    }
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                />

                <button
                    type="button"
                    onClick={() =>
                        togglePassword(
                            visibleKey
                        )
                    }
                >
                    {showPassword[
                        visibleKey
                    ] ? (
                        <FaEyeSlash />
                    ) : (
                        <FaEye />
                    )}
                </button>

            </div>

        </div>

    );

    return (

        <form
            className="change-password-form"
            onSubmit={handleSubmit}
        >

            {renderPasswordField(
                "current_password",
                "Current Password",
                "current"
            )}

            {renderPasswordField(
                "new_password",
                "New Password",
                "new"
            )}

            {renderPasswordField(
                "confirm_password",
                "Confirm Password",
                "confirm"
            )}

            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            <button
                className="save-password-btn"
                disabled={loading}
            >
                {loading
                    ? "Updating..."
                    : "Update Password"}
            </button>

        </form>

    );

}

export default ChangePasswordForm;