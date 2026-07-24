import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  console.log("cartOpen =", cartOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

return (
  <>
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

      <div className="navbar-container">

        <Link to="/" className="logo">
          <span className="logo-number">3</span>
          <span className="logo-text">3Seven Studio</span>
        </Link>

        <nav className={mobileMenu ? "nav active" : "nav"}>
          {navigation.map((item) => (
            <Link key={item.id} to={item.path}>
              {item.label}
            </Link>
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