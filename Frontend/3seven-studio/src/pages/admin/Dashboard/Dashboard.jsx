import {
    FaBoxOpen,
    FaShoppingBag,
    FaUsers,
    FaRupeeSign,
} from "react-icons/fa";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import StatCard from "../../../components/admin/StatCard/StatCard";

function Dashboard() {

    return (

        <>

            <PageHeader
                title="Dashboard"
                subtitle="Welcome to the 3Seven Studio Admin Panel"
            />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "20px",
                }}
            >

                <StatCard
                    title="Revenue"
                    value="₹0"
                    icon={<FaRupeeSign />}
                />

                <StatCard
                    title="Orders"
                    value="0"
                    icon={<FaShoppingBag />}
                />

                <StatCard
                    title="Customers"
                    value="0"
                    icon={<FaUsers />}
                />

                <StatCard
                    title="Products"
                    value="0"
                    icon={<FaBoxOpen />}
                />

            </div>

        </>

    );

}

export default Dashboard;