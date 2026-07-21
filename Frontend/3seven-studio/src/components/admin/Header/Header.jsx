import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

import "./Header.css";

function Header() {

    return (

        <header className="admin-header">

            <div className="header-search">

                <FaSearch />

                <input
                    placeholder="Search..."
                />

            </div>

            <div className="header-right">

                <button className="icon-btn">
                    <FaBell />
                </button>

                <div className="admin-profile">

                    <FaUserCircle />

                    <span>
                        Administrator
                    </span>

                </div>

            </div>

        </header>

    );

}

export default Header;