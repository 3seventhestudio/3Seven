import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
// import DataTable from "../../../components/admin/DataTable/DataTable";

import {
    getPages,
} from "../../../services/admin/cmsService";


const PageList = () => {

    const [pages, setPages] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchPages();
    }, []);


    const fetchPages = async () => {

        try {

            setLoading(true);

            const response = await getPages();

            setPages(
                response.data || []
            );


        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to load pages."
            );

        } finally {

            setLoading(false);

        }

    };


    const columns = [

        {
            key: "title",
            label: "Title",
        },

        {
            key: "slug",
            label: "Slug",
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
                title="Pages"
                subtitle="Manage static website pages."
            />


            <DataTable
                columns={columns}
                data={pages}
                loading={loading}
            />

        </div>

    );

};


export default PageList;