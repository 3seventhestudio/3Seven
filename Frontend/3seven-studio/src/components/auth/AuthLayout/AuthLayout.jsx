import "./AuthLayout.css";
import authBackground from "../../../assets/images/auth/auth-bg.png";

function AuthLayout({ children }) {

    return (

        <div className="auth-layout" style={{ backgroundImage: `url(${authBackground})`,}}>

            <div className="auth-overlay"></div>

            <div className="auth-brand">

                <span className="brand-name">
                    3Seven Studio
                </span>

                <h1>
                    Crafted for Confidence.
                </h1>

                <p>
                    Designed for women who choose confidence over trends.
                    Premium denim, timeless silhouettes, and effortless comfort—
                    crafted to move with you every day.
                </p>

            </div>

            <div className="auth-content">

                {children}

            </div>

        </div>

    );

}

export default AuthLayout;