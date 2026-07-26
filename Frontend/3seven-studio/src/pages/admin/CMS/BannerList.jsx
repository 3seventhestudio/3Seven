import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import DataTable from "../../../components/admin/DataTable/DataTable";
import ConfirmDialog from "../../../components/admin/ConfirmDialog/ConfirmDialog";

import {
    getBanners,
    deleteBanner,
} from "../../../services/admin/cmsService";


const BannerList = () => {

    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const [deleteId, setDeleteId] = useState(null);


    useEffect(() => {
        fetchBanners();
    }, []);


    const fetchBanners = async () => {

        try {

            setLoading(true);

            const response = await getBanners();

            setBanners(
                response.data || []
            );

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to load banners."
            );

        } finally {

            setLoading(false);

        }
    };


    const handleDelete = async () => {

        try {

            await deleteBanner(deleteId);

            toast.success(
                "Banner deleted successfully."
            );

            setDeleteId(null);

            fetchBanners();

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to delete banner."
            );

        }
    };


    const columns = [

        {
            key: "title",
            label: "Title",
        },

        {
            key: "banner_type",
            label: "Type",
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
            key: "actions",
            label: "Actions",
            render: (row) => (
                <button
                    onClick={() =>
                        setDeleteId(row.id)
                    }
                    className="text-red-600 hover:text-red-800"
                >
                    Delete
                </button>
            ),
        },

    ];


    return (

        <div className="space-y-6">

            <PageHeader
                title="Banners"
                subtitle="Manage homepage and promotional banners."
            />


            <DataTable
                columns={columns}
                data={banners}
                loading={loading}
            />


            <ConfirmDialog
                open={Boolean(deleteId)}
                title="Delete Banner"
                message="Are you sure you want to delete this banner?"
                onConfirm={handleDelete}
                onCancel={() =>
                    setDeleteId(null)
                }
            />

        </div>

    );
};


export default BannerList;