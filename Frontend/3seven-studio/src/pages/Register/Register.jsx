import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout/AuthLayout";
import AuthCard from "../../components/auth/AuthCard/AuthCard";
import AuthInput from "../../components/auth/AuthInput/AuthInput";
import AuthButton from "../../components/auth/AuthButton/AuthButton";

import { register } from "../../services/authService";

import {
    isRequired,
    isValidEmail,
    isValidPhone,
    isStrongPassword,
} from "../../utils/validators";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };

    const validateForm = () => {

        const validationErrors = {};

        if (!isRequired(formData.first_name)) {
            validationErrors.first_name = "First name is required.";
        }

        if (!isRequired(formData.last_name)) {
            validationErrors.last_name = "Last name is required.";
        }

        if (!isValidEmail(formData.email)) {
            validationErrors.email = "Please enter a valid email address.";
        }

        if (!isValidPhone(formData.phone_number)) {
            validationErrors.phone_number = "Please enter a valid mobile number.";
        }

        if (!isStrongPassword(formData.password)) {
            validationErrors.password =
                "Minimum 8 characters with uppercase, lowercase, number and special character.";
        }

        if (formData.password !== formData.confirm_password) {
            validationErrors.confirm_password =
                "Passwords do not match.";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {

            setLoading(true);

            await register({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone_number: formData.phone_number,
                password: formData.password,
            });

            navigate("/login");

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                "Unable to create account.";

            setErrors({
                api: message,
            });

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout>

            <AuthCard>

                <div className="register-header">

                    <span className="register-subtitle">
                        CREATE ACCOUNT
                    </span>

                    <h2>
                        Join 3Seven Studio
                    </h2>

                    <p>
                        Create your account to enjoy a faster checkout,
                        order tracking and exclusive collections.
                    </p>

                </div>

                {
                    errors.api && (

                        <div className="register-error">

                            {errors.api}

                        </div>

                    )
                }

                <form onSubmit={handleSubmit}>

                    <AuthInput
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        error={errors.first_name}
                        required
                    />

                    <AuthInput
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        error={errors.last_name}
                        required
                    />

                    <AuthInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                    />

                    <AuthInput
                        label="Phone Number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        error={errors.phone_number}
                        required
                    />

                    <AuthInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                    />

                    <AuthInput
                        label="Confirm Password"
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        error={errors.confirm_password}
                        required
                    />

                    <AuthButton
                        type="submit"
                        loading={loading}
                    >
                        CREATE ACCOUNT
                    </AuthButton>

                </form>

                <div className="login-link">

                    Already have an account?

                    <Link to="/login">

                        Sign In

                    </Link>

                </div>

            </AuthCard>

        </AuthLayout>

    );

}

export default Register;