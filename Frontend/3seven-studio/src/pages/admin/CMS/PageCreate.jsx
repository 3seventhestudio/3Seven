import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    createPage,
} from "../../../services/admin/cmsService";


const PageCreate = () => {

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();


        const formData = new FormData(
            e.target
        );


        const data = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            content: formData.get("content"),
            is_active:
                formData.get("is_active") === "on",
        };


        try {

            await createPage(data);


            toast.success(
                "Page created successfully."
            );


            navigate(
                "/admin/cms/pages"
            );


        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to create page."
            );

        }

    };


    return (

        <div className="space-y-6">

            <PageHeader
                title="Create Page"
                subtitle="Create a new website content page."
            />


            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow p-6 space-y-5"
            >


                <div>

                    <label className="block text-sm font-medium mb-1">
                        Title
                    </label>

                    <input
                        name="title"
                        required
                        className="w-full border rounded px-3 py-2"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Slug
                    </label>

                    <input
                        name="slug"
                        required
                        placeholder="about-us"
                        className="w-full border rounded px-3 py-2"
                    />

                </div>



                <div>

                    <label className="block text-sm font-medium mb-1">
                        Content
                    </label>

                    <textarea
                        name="content"
                        rows="10"
                        required
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
                    Save Page
                </button>


            </form>


        </div>

    );

};


export default PageCreate;