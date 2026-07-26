import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import { getCustomers } from "../../../services/admin/customerService";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCustomers = async () => {
        try {
            setLoading(true);

            const response = await getCustomers();

            setCustomers(response.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    if (loading) {
        return <div className="loading-state">Loading...</div>;
    }

    return (
        <div className="admin-page">

            <PageHeader
                title="Customers"
                subtitle="Manage registered customers"
            />

            <div className="admin-card">

                <div className="table-responsive">

                    <table className="admin-table">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Orders</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th width="100">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {customers.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="empty-state">
                                        No customers found.
                                    </td>
                                </tr>
                            )}

                            {customers.map((customer) => (
                                <tr key={customer.id}>

                                    <td>{customer.full_name}</td>

                                    <td>{customer.email}</td>

                                    <td>{customer.phone}</td>

                                    <td>{customer.total_orders}</td>

                                    <td>
                                        <span
                                            className={`badge ${
                                                customer.is_active
                                                    ? "badge-success"
                                                    : "badge-danger"
                                            }`}
                                        >
                                            {customer.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>

                                    <td>
                                        {new Date(
                                            customer.date_joined
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <Link
                                            to={`/admin/customers/${customer.id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            View
                                        </Link>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default CustomerList;