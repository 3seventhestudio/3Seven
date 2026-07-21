import { NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaTags,
    FaWarehouse,
    FaShoppingBag,
    FaUsers,
    FaTicketAlt,
    FaFileAlt,
    FaChartBar,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

import "./Sidebar.css";

const menuItems = [
    {
        label: "Dashboard",
        path: "/admin",
        icon: <FaTachometerAlt />,
    },
    {
        label: "Products",
        path: "/admin/products",
        icon: <FaBoxOpen />,
    },
    {
        label: "Categories",
        path: "/admin/categories",
        icon: <FaTags />,
    },
    {
        label: "Inventory",
        path: "/admin/inventory",
        icon: <FaWarehouse />,
    },
    {
        label: "Orders",
        path: "/admin/orders",
        icon: <FaShoppingBag />,
    },
    {
        label: "Customers",
        path: "/admin/customers",
        icon: <FaUsers />,
    },
    {
        label: "Coupons",
        path: "/admin/coupons",
        icon: <FaTicketAlt />,
    },
    {
        label: "CMS",
        path: "/admin/cms",
        icon: <FaFileAlt />,
    },
    {
        label: "Reports",
        path: "/admin/reports",
        icon: <FaChartBar />,
    },
    {
        label: "Settings",
        path: "/admin/settings",
        icon: <FaCog />,
    },
];

function Sidebar() {
    return (
        <aside className="admin-sidebar">

            <div className="admin-logo">
                3Seven Studio
            </div>

            <nav>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive
                                ? "admin-menu active"
                                : "admin-menu"
                        }
                        end={item.path === "/admin"}
                    >
                        {item.icon}

                        <span>
                            {item.label}
                        </span>

                    </NavLink>
                ))}

            </nav>

            <button className="logout-btn">

                <FaSignOutAlt />

                <span>Logout</span>

            </button>

        </aside>
    );
}

export default Sidebar;