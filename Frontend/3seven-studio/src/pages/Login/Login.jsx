import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout/AuthLayout";
import AuthCard from "../../components/auth/AuthCard/AuthCard";
import AuthInput from "../../components/auth/AuthInput/AuthInput";
import AuthButton from "../../components/auth/AuthButton/AuthButton";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [formData, setFormData] = useState({

        email: "",

        password: "",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await loginService(formData);

            login(

                response.data.user,

                response.data.access,

                response.data.refresh

            );

            navigate("/");

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "Unable to login."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout>

            <AuthCard>

                <div className="login-header">

                    <span className="login-subtitle">

                        Welcome Back

                    </span>

                    <h2>

                        Sign in to your account

                    </h2>

                    <p>

                        Continue shopping with 3Seven Studio.

                    </p>

                </div>

                {
                    error &&

                    <div className="login-error">

                        {error}

                    </div>
                }

                <form onSubmit={handleSubmit}>

                    <AuthInput

                        label="Email Address"

                        name="email"

                        type="email"

                        value={formData.email}

                        onChange={handleChange}

                        placeholder="Enter your email"

                    />

                    <AuthInput

                        label="Password"

                        name="password"

                        type="password"

                        value={formData.password}

                        onChange={handleChange}

                        placeholder="Enter your password"

                    />

                    <div className="login-links">

                        <Link to="/forgot-password">

                            Forgot Password?

                        </Link>

                    </div>

                    <AuthButton
                        type="submit"
                        loading={loading}
                    >
                        CONTINUE →
                    </AuthButton>

                </form>

                <div className="register-link">

                    New to 3Seven Studio?

                    <Link to="/register">

                        Create Account

                    </Link>

                </div>

            </AuthCard>

        </AuthLayout>

    );

}

export default Login;