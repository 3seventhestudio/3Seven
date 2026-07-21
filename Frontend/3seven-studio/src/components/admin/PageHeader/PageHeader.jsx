import "./PageHeader.css";

function PageHeader({
    title,
    subtitle,
    action,
}) {
    return (
        <div className="page-header">

            <div className="page-header-left">

                <h1>{title}</h1>

                {subtitle && (
                    <p>{subtitle}</p>
                )}

            </div>

            <div className="page-header-right">
                {action}
            </div>

        </div>
    );
}

export default PageHeader;