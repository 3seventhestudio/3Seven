import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";

import {
    getSiteSettings,
    updateSiteSettings,
} from "../../../services/admin/cmsService";


const SiteSettings = () => {

    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchSettings();
    }, []);


    const fetchSettings = async () => {

        try {

            setLoading(true);

            const response = await getSiteSettings();

            setSettings(
                response.data
            );

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to load settings."
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

            await updateSiteSettings(
                formData
            );


            toast.success(
                "Settings updated successfully."
            );


            fetchSettings();


        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to update settings."
            );

        }

    };


    if (loading) {

        return (
            <div className="py-10 text-center">
                Loading settings...
            </div>
        );

    }


    return (

        <div className="space-y-6">

            <PageHeader
                title="Site Settings"
                subtitle="Manage company and website settings."
            />


            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="bg-white rounded-lg shadow p-6 space-y-5"
            >


                <div>
                    <label className="block text-sm font-medium mb-1">
                        Company Name
                    </label>

                    <input
                        name="company_name"
                        defaultValue={
                            settings?.company_name
                        }
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Company Email
                    </label>

                    <input
                        name="company_email"
                        type="email"
                        defaultValue={
                            settings?.company_email
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Company Phone
                    </label>

                    <input
                        name="company_phone"
                        defaultValue={
                            settings?.company_phone
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        GST Number
                    </label>

                    <input
                        name="gst_number"
                        defaultValue={
                            settings?.gst_number
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Warehouse Contact Name
                    </label>

                    <input
                        name="warehouse_contact_name"
                        defaultValue={
                            settings?.warehouse_contact_name
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Warehouse Phone
                    </label>

                    <input
                        name="warehouse_phone"
                        defaultValue={
                            settings?.warehouse_phone
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Warehouse Email
                    </label>

                    <input
                        name="warehouse_email"
                        type="email"
                        defaultValue={
                            settings?.warehouse_email
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Address Line 1
                    </label>

                    <input
                        name="address_line_1"
                        defaultValue={
                            settings?.address_line_1
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Address Line 2
                    </label>

                    <input
                        name="address_line_2"
                        defaultValue={
                            settings?.address_line_2
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <input
                        name="city"
                        placeholder="City"
                        defaultValue={
                            settings?.city
                        }
                        className="border rounded px-3 py-2"
                    />


                    <input
                        name="state"
                        placeholder="State"
                        defaultValue={
                            settings?.state
                        }
                        className="border rounded px-3 py-2"
                    />


                    <input
                        name="postal_code"
                        placeholder="Postal Code"
                        defaultValue={
                            settings?.postal_code
                        }
                        className="border rounded px-3 py-2"
                    />

                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Logo
                    </label>

                    <input
                        name="logo"
                        type="file"
                        accept="image/*"
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Footer Content
                    </label>

                    <textarea
                        name="footer_content"
                        rows="5"
                        defaultValue={
                            settings?.footer_content
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Instagram URL
                    </label>

                    <input
                        name="instagram_url"
                        defaultValue={
                            settings?.instagram_url
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div>
                    <label className="block text-sm font-medium mb-1">
                        Facebook URL
                    </label>

                    <input
                        name="facebook_url"
                        defaultValue={
                            settings?.facebook_url
                        }
                        className="w-full border rounded px-3 py-2"
                    />
                </div>



                <div className="flex items-center gap-2">

                    <input
                        name="maintenance_mode"
                        type="checkbox"
                        defaultChecked={
                            settings?.maintenance_mode
                        }
                    />

                    <label>
                        Maintenance Mode
                    </label>

                </div>



                <div className="flex items-center gap-2">

                    <input
                        name="is_active"
                        type="checkbox"
                        defaultChecked={
                            settings?.is_active
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
                    Save Settings
                </button>


            </form>


        </div>

    );

};


export default SiteSettings;