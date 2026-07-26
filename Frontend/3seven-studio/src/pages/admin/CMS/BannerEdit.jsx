import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    getBanners,
    updateBanner,
} from "../../../services/admin/cmsService";


const BannerEdit = () => {

    const { bannerId } = useParams();

    const navigate = useNavigate();

    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchBanner();

    }, []);


    const fetchBanner = async () => {

        try {

            const response = await getBanners();

            const item = response.data.find(
                (banner) =>
                    banner.id === bannerId
            );

            setBanner(item);

        } catch (error) {

            toast.error(
                "Failed to load banner."
            );

        } finally {

            setLoading(false);

        }

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        const formData = new FormData(
            e.target
        );


        try {

            await updateBanner(
                bannerId,
                formData
            );


            toast.success(
                "Banner updated successfully."
            );


            navigate(
                "/admin/cms/banners"
            );


        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to update banner."
            );

        }

    };


    if (loading) {

        return (
            <div className="py-10 text-center">
                Loading banner...
            </div>
        );

    }


    if (!banner) {

        return (
            <div className="py-10 text-center">
                Banner not found.
            </div>
        );

    }


    return (

        <div className="space-y-6">

            <PageHeader
                title="Edit Banner"
                subtitle="Update banner details."
            />


            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="bg-white rounded-lg shadow p-6 space-y-5"
            >


                <div>

                    <label className="block text-sm font-medium mb-1">
                        Title
                    </label>

                    <input
                        name="title"
                        defaultValue={banner.title}
                        required
                        className="w-full border rounded px-3 py-2"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Subtitle
                    </label>

                    <input
                        name="subtitle"
                        defaultValue={
                            banner.subtitle
                        }
                        className="w-full border rounded px-3 py-2"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Banner Type
                    </label>

                    <select
                        name="banner_type"
                        defaultValue={
                            banner.banner_type
                        }
                        className="w-full border rounded px-3 py-2"
                    >

                        <option value="hero">
                            Hero Banner
                        </option>

                        <option value="collection">
                            Collection Banner
                        </option>

                        <option value="promotion">
                            Promotion Banner
                        </option>

                    </select>

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Replace Image
                    </label>

                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Replace Mobile Image
                    </label>

                    <input
                        name="mobile_image"
                        type="file"
                        accept="image/*"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Button Text
                    </label>

                    <input
                        name="button_text"
                        defaultValue={
                            banner.button_text
                        }
                        className="w-full border rounded px-3 py-2"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Button Link
                    </label>

                    <input
                        name="button_link"
                        defaultValue={
                            banner.button_link
                        }
                        className="w-full border rounded px-3 py-2"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Display Order
                    </label>

                    <input
                        name="display_order"
                        type="number"
                        defaultValue={
                            banner.display_order
                        }
                        className="w-full border rounded px-3 py-2"
                    />

                </div>



                <div className="flex items-center gap-2">

                    <input
                        name="is_active"
                        type="checkbox"
                        defaultChecked={
                            banner.is_active
                        }
                    />

                    <label>
                        Active
                    </label>

                </div>



                <button
                    type="submit"
                    className="px-5 py-2 rounded bg-black text-white"
                >
                    Update Banner
                </button>


            </form>


        </div>

    );

};


export default BannerEdit;