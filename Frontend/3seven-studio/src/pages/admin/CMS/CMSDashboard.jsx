import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import StatCard from "../../../components/admin/StatCard/StatCard";


const CMSDashboard = () => {

    const navigate = useNavigate();


    return (
        <div className="space-y-6">

            <PageHeader
                title="CMS Management"
                subtitle="Manage website content, banners, pages and settings."
            />


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <StatCard
                    title="Banners"
                    value="Manage"
                    description="Homepage and promotional banners"
                    onClick={() =>
                        navigate("/admin/cms/banners")
                    }
                />


                <StatCard
                    title="Pages"
                    value="Manage"
                    description="Static pages and content"
                    onClick={() =>
                        navigate("/admin/cms/pages")
                    }
                />


                <StatCard
                    title="FAQ"
                    value="Manage"
                    description="Customer frequently asked questions"
                    onClick={() =>
                        navigate("/admin/cms/faqs")
                    }
                />


                <StatCard
                    title="Settings"
                    value="Manage"
                    description="Company and website settings"
                    onClick={() =>
                        navigate("/admin/cms/settings")
                    }
                />

            </div>

        </div>
    );
};


export default CMSDashboard;