import { NavLink, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaMapMarkerAlt,
    FaShoppingBag,
    FaKey,
    FaTachometerAlt,
    FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../../context/AuthContext";

import "./AccountSidebar.css";

function AccountSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <aside className="account-sidebar">

            <h2 className="sidebar-title">
                My Account
            </h2>

            <nav className="account-nav">

                <NavLink
                    to="/account"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? "account-link active"
                            : "account-link"
                    }
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/account/profile"
                    className={({ isActive }) =>
                        isActive
                            ? "account-link active"
                            : "account-link"
                    }
                >
                    <FaUser />
                    <span>Profile</span>
                </NavLink>

                <NavLink
                    to="/account/addresses"
                    className={({ isActive }) =>
                        isActive
                            ? "account-link active"
                            : "account-link"
                    }
                >
                    <FaMapMarkerAlt />
                    <span>Addresses</span>
                </NavLink>

                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        isActive
                            ? "account-link active"
                            : "account-link"
                    }
                >
                    <FaShoppingBag />
                    <span>My Orders</span>
                </NavLink>

                <NavLink
                    to="/account/change-password"
                    className={({ isActive }) =>
                        isActive
                            ? "account-link active"
                            : "account-link"
                    }
                >
                    <FaKey />
                    <span>Change Password</span>
                </NavLink>

                <button
                    type="button"
                    className="account-link logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>

            </nav>

        </aside>
    );
}

export default AccountSidebar;