import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import Breadcrumb from "../../common/Breadcrumb/Breadcrumb";

import AccountSidebar from "../AccountSidebar/AccountSidebar";

import "./AccountLayout.css";

function AccountLayout({
    title,
    children,
}) {
    return (
        <>
            <Navbar />

            <Breadcrumb
                items={[
                    {
                        label: "Home",
                        link: "/",
                    },
                    {
                        label: "My Account",
                    },
                    {
                        label: title,
                    },
                ]}
            />

            <section className="account-page">

                <div className="account-container">

                    <AccountSidebar />

                    <main className="account-content">

                        <h1 className="account-title">
                            {title}
                        </h1>

                        {children}

                    </main>

                </div>

            </section>

            <Footer />
        </>
    );
}

export default AccountLayout;