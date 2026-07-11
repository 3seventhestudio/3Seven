import "./Footer.css";

import Container from "../../common/Container/Container";
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

                            <li><a href="#">New Arrivals</a></li>
                            <li><a href="#">Best Sellers</a></li>
                            <li><a href="#">Collections</a></li>
                            <li><a href="#">Sale</a></li>

                        </ul>

                    </div>

                    <div>

                        <h4>Company</h4>

                        <ul>

                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>

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