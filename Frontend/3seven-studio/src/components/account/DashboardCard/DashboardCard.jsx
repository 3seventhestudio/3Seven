import "./DashboardCard.css";

function DashboardCard({
    title,
    value,
    subtitle,
    icon,
}) {
    return (
        <div className="dashboard-card">

            <div className="dashboard-card-header">

                <div>

                    <p className="dashboard-card-title">
                        {title}
                    </p>

                    <h2 className="dashboard-card-value">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="dashboard-card-subtitle">
                            {subtitle}
                        </p>
                    )}

                </div>

                {icon && (
                    <div className="dashboard-card-icon">
                        {icon}
                    </div>
                )}

            </div>

        </div>
    );
}

export default DashboardCard;