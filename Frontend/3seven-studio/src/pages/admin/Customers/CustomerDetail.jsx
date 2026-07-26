import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    getCustomer,
    updateCustomer,
} from "../../../services/admin/customerService";

const CustomerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        is_active: true,
    });

    useEffect(() => {
        loadCustomer();
    }, []);

    const loadCustomer = async () => {
        try {
            const response = await getCustomer(id);

            const customer = response.data;

            setFormData({
                first_name: customer.first_name || "",
                last_name: customer.last_name || "",
                email: customer.email || "",
                phone: customer.phone || "",
                is_active: customer.is_active,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateCustomer(id, formData);

            navigate("/admin/customers");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div className="loading-state">Loading...</div>;
    }

    return (
        <div className="admin-page">

            <PageHeader
                title="Customer Details"
                subtitle="View and update customer"
            />

            <div className="admin-card">

                <form
                    className="admin-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label>First Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>

                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-check">
                        <input
                            id="is_active"
                            type="checkbox"
                            className="form-check-input"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleChange}
                        />

                        <label htmlFor="is_active">
                            Active Customer
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Save Changes
                    </button>

                </form>

            </div>

        </div>
    );
};

export default CustomerDetail;