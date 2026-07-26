import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
// import DataTable from "../../../components/admin/DataTable/DataTable";

import {
    getFAQs,
} from "../../../services/admin/cmsService";


const FAQList = () => {

    const [faqs, setFaqs] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchFAQs();
    }, []);


    const fetchFAQs = async () => {

        try {

            setLoading(true);

            const response = await getFAQs();

            setFaqs(
                response.data || []
            );

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to load FAQs."
            );

        } finally {

            setLoading(false);

        }

    };


    const columns = [

        {
            key: "question",
            label: "Question",
        },

        {
            key: "display_order",
            label: "Order",
        },

        {
            key: "is_active",
            label: "Status",
            render: (row) =>
                row.is_active
                    ? "Active"
                    : "Inactive",
        },

        {
            key: "created_at",
            label: "Created",
            render: (row) =>
                new Date(
                    row.created_at
                ).toLocaleDateString(),
        },

    ];


    return (

        <div className="space-y-6">

            <PageHeader
                title="FAQs"
                subtitle="Manage frequently asked questions."
            />


            <DataTable
                columns={columns}
                data={faqs}
                loading={loading}
            />

        </div>

    );

};


export default FAQList;