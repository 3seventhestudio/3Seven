import PropTypes from "prop-types";
import {
    ExternalLink,
    Package,
    Truck,
    Hash,
    MapPinned,
    FileText,
} from "lucide-react";

const DetailItem = ({ icon: Icon, label, value, link = false }) => (
    <div className="flex items-start gap-4">
        <div className="rounded-lg bg-gray-100 p-2.5">
            <Icon className="h-5 w-5 text-gray-600" />
        </div>

        <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {label}
            </p>

            {link && value ? (
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                    Track Shipment
                    <ExternalLink className="h-4 w-4" />
                </a>
            ) : (
                <p className="mt-1 break-all text-sm text-gray-900">
                    {value || "-"}
                </p>
            )}
        </div>
    </div>
);

DetailItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    link: PropTypes.bool,
};

DetailItem.defaultProps = {
    value: "",
    link: false,
};

const ShippingDetailsCard = ({ order }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Shipping Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Courier and shipment information.
                </p>
            </div>

            <div className="space-y-6 p-6">
                <DetailItem
                    icon={Truck}
                    label="Shipping Provider"
                    value={order.shipping_provider}
                />

                <DetailItem
                    icon={Package}
                    label="Courier Name"
                    value={order.courier_name}
                />

                <DetailItem
                    icon={Truck}
                    label="Courier Service"
                    value={order.courier_service}
                />

                <DetailItem
                    icon={Hash}
                    label="Shipment ID"
                    value={order.shipment_id}
                />

                <DetailItem
                    icon={MapPinned}
                    label="Tracking Number"
                    value={order.tracking_number}
                />

                <DetailItem
                    icon={ExternalLink}
                    label="Tracking URL"
                    value={order.tracking_url}
                    link
                />

                <DetailItem
                    icon={FileText}
                    label="Shipping Label"
                    value={order.shipping_label}
                />
            </div>
        </div>
    );
};

ShippingDetailsCard.propTypes = {
    order: PropTypes.shape({
        shipping_provider: PropTypes.string,
        courier_name: PropTypes.string,
        courier_service: PropTypes.string,
        shipment_id: PropTypes.string,
        tracking_number: PropTypes.string,
        tracking_url: PropTypes.string,
        shipping_label: PropTypes.string,
    }).isRequired,
};

export default ShippingDetailsCard;