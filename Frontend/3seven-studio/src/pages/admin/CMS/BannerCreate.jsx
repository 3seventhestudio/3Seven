import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    createBanner,
} from "../../../services/admin/cmsService";


const BannerCreate = () => {

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();


        const formData = new FormData(e.target);


        try {

            await createBanner(formData);


            toast.success(
                "Banner created successfully."
            );


            navigate(
                "/admin/cms/banners"
            );


        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to create banner."
            );

        }

    };


    return (

        <div className="space-y-6">

            <PageHeader
                title="Create Banner"
                subtitle="Add a new homepage or promotional banner."
            />


            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow p-6 space-y-5"
                encType="multipart/form-data"
            >


                <div>

                    <label className="block text-sm font-medium mb-1">
                        Title
                    </label>

                    <input
                        name="title"
                        type="text"
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
                        type="text"
                        className="w-full border rounded px-3 py-2"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Banner Type
                    </label>

                    <select
                        name="banner_type"
                        className="w-full border rounded px-3 py-2"
                        defaultValue="hero"
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
                        Banner Image
                    </label>

                    <input
                        name="image"
                        type="file"
                        required
                        accept="image/*"
                        className="w-full"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Mobile Image
                    </label>

                    <input
                        name="mobile_image"
                        type="file"
                        accept="image/*"
                        className="w-full"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Button Text
                    </label>

                    <input
                        name="button_text"
                        type="text"
                        className="w-full border rounded px-3 py-2"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Button Link
                    </label>

                    <input
                        name="button_link"
                        type="text"
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
                        defaultValue="0"
                        className="w-full border rounded px-3 py-2"
                    />

                </div>



                <div className="flex items-center gap-2">

                    <input
                        name="is_active"
                        type="checkbox"
                        defaultChecked
                    />

                    <label>
                        Active
                    </label>

                </div>



                <button
                    type="submit"
                    className="px-5 py-2 rounded bg-black text-white"
                >
                    Save Banner
                </button>


            </form>

        </div>

    );
};


export default BannerCreate;