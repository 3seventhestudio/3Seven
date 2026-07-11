import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiMenu,
  FiX,
} from "react-icons/fi";
import navigation from "../../../data/navigation";
import "./Navbar.css";
import { useCart } from "../../../context/CartContext";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

      <div className="navbar-container">

        <Link to="/" className="logo">

        <span className="logo-number">3</span>

        <span className="logo-text">Seven Studio</span>

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

          <FiHeart />

          <div className="cart-icon">

            <FiShoppingBag />

            <span>{cartCount}</span>

          </div>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;