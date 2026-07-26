import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";
import CartIcon from "../../cart/CartIcon/CartIcon";
import CartDrawer from "../../cart/CartDrawer/CartDrawer";
import navigation from "../../../data/navigation";
import { useAuth } from "../../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

return (
  <>
    <header className={scrolled ? "navbar navbar-scrolled" : "navbar"}>

      <div className="navbar-container">

        <Link to="/" className="logo-luxury">
          <div className="logo-main">3SEVEN</div>
          <div className="logo-sub">STUDIO</div>
        </Link>

        <nav className={mobileMenu ? "nav active" : "nav"}>
          {navigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              end={item.path === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-icons">

          <FiSearch />

          <Link to={isAuthenticated ? "/account" : "/login"} aria-label="Account" style={{ display: "flex", alignItems: "center", color: "inherit" }}>
            <FiUser />
          </Link>

          <FiHeart />

          <CartIcon
            onClick={() => {
              console.log("Cart icon clicked");
              setCartOpen(true);
            }}
          />

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>

        </div>

      </div>

    </header>

    <CartDrawer
      isOpen={cartOpen}
      onClose={() => setCartOpen(false)}
    />
  </>
);
}

export default Navbar;