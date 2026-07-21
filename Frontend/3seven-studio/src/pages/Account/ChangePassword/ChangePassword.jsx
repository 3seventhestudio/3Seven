import { useState } from "react";

import Navbar from "../../../components/layout/Navbar/Navbar";
import Footer from "../../../components/layout/Footer/Footer";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb";

import ChangePasswordForm from "../../../components/account/ChangePasswordForm/ChangePasswordForm";

import { changePassword } from "../../../services/authService";

import "./ChangePassword.css";

function ChangePassword() {

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (
        formData,
        setFormError
    ) => {

        try {

            setLoading(true);

            setSuccess("");

            setError("");

            await changePassword(formData);

            setSuccess(
                "Password changed successfully."
            );

        } catch (err) {

            console.error(err);

            const message =
                err?.response?.data?.message ||
                "Unable to change password.";

            setError(message);

            setFormError(message);

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
                        label: "Dashboard",
                        link: "/account",
                    },
                    {
                        label: "Change Password",
                    },
                ]}
            />

            <section className="change-password-page">

                <div className="change-password-container">

                    <div className="page-header">

                        <h1>
                            Change Password
                        </h1>

                        <p>
                            Update your account password.
                        </p>

                    </div>

                    {success && (
                        <div className="success-message">
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <ChangePasswordForm
                        loading={loading}
                        onSubmit={handleSubmit}
                    />

                </div>

            </section>

            <Footer />
        </>
    );

}

export default ChangePassword;