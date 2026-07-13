import "./AuthButton.css";

function AuthButton({
    children,
    type = "button",
    loading = false,
    disabled = false,
}) {

    return (

        <button
            className="auth-button"
            type={type}
            disabled={loading || disabled}
        >

            {
                loading
                    ? "Please wait..."
                    : children
            }

        </button>

    );

}

export default AuthButton;