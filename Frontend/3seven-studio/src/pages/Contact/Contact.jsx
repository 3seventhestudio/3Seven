import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "Contact" },
        ]}
      />

      <main className="contact-page">
        <div className="container">
          <div className="contact-header">
            <span>Get In Touch</span>
            <h1>We'd Love to Hear From You</h1>
            <p>
              Have a question about our sizes, custom denim washes, shipping times, or
              wholesale partnerships? Write to us.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              <p>Feel free to reach out using any of the channels below.</p>

              <div className="info-cards">
                <div className="info-card">
                  <h3>Customer Care</h3>
                  <p>hello@3sevenstudio.com</p>
                  <p>+91 98765 43210</p>
                </div>
                <div className="info-card">
                  <h3>Studio Headquarters</h3>
                  <p>3Seven Studio Design Center</p>
                  <p>Lower Parel, Mumbai, MH - 400013</p>
                </div>
                <div className="info-card">
                  <h3>Press & Wholesale</h3>
                  <p>wholesale@3sevenstudio.com</p>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              {success && (
                <div className="alert-success">
                  Thank you! Your message has been sent successfully. We will get back
                  to you within 24 hours.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject of message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Contact;
