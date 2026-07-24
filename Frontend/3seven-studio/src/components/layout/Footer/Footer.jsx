import { Link } from "react-router-dom";
import Container from "../../common/Container/Container";
import "./Footer.css";
import {
    FiFacebook,
    FiInstagram,
    FiTwitter,
    FiMail,
    FiPhone,
    FiMapPin
} from "react-icons/fi";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">

            <Container>

                <div className="footer-grid">

                    <div className="footer-brand">

                        <h2>3Seven Studio</h2>

                        <p>
                            Premium women's denim crafted with timeless style,
                            exceptional comfort and confidence in every stitch.
                        </p>

                        <div className="social-icons">

                            <a href="#"><FiFacebook /></a>
                            <a href="#"><FiInstagram /></a>
                            <a href="#"><FiTwitter /></a>

                        </div>

                    </div>

                    <div>

                        <h4>Shop</h4>

                        <ul>

                            <li><Link to="/shop">New Arrivals</Link></li>
                            <li><Link to="/shop">Best Sellers</Link></li>
                            <li><Link to="/collections">Collections</Link></li>
                            <li><Link to="/shop">Sale</Link></li>

                        </ul>

                    </div>

                    <div>

                        <h4>Company</h4>

                        <ul>

                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/journal">Journal</Link></li>
                            <li><Link to="/admin">Admin Portal</Link></li>

                        </ul>

                    </div>

                    <div>

                        <h4>Contact</h4>

                        <ul className="contact-list">

                            <li>
                                <FiMail />
                                support@3sevenstudio.com
                            </li>

                            <li>
                                <FiPhone />
                                +91 99999 99999
                            </li>

                            <li>
                                <FiMapPin />
                                Ahmedabad, Gujarat
                            </li>

                        </ul>

                    </div>

                </div>

                <div className="footer-bottom">

                    <p>
                        © {year} 3Seven Studio. All rights reserved.
                    </p>

                </div>

            </Container>

        </footer>
    );
}

export default Footer;