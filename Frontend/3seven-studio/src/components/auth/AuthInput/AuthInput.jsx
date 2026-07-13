import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./AuthInput.css";

function AuthInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    onBlur,
    placeholder = "",
    error = "",
    required = false,
}) {

    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password"
            ? (showPassword ? "text" : "password")
            : type;

    const inputId = `input-${name}`;

    return (

        <div className="auth-input-group">

            <label
                htmlFor={inputId}
                className="auth-label"
            >

                {label}

                {
                    required &&

                    <span className="required">*</span>
                }

            </label>

            <div className="auth-input-wrapper">

                <input
                    id={inputId}
                    className={`auth-input ${error ? "error" : ""}`}
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    autoComplete={name}
                    aria-invalid={!!error}
                    aria-describedby={
                        error
                            ? `${inputId}-error`
                            : undefined
                    }
                />

                {
                    type === "password" && (

                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >

                            {
                                showPassword
                                    ? <EyeOff size={18}/>
                                    : <Eye size={18}/>
                            }

                        </button>

                    )
                }

            </div>

            {
                error && (

                    <span
                        id={`${inputId}-error`}
                        className="input-error"
                    >

                        {error}

                    </span>

                )
            }

        </div>

    );

}

export default AuthInput;