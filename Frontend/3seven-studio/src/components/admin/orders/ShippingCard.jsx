import PropTypes from "prop-types";
import { Home, MapPin, Phone, User } from "lucide-react";

const ShippingCard = ({ address }) => {
    const fullAddress = [
        address?.address_line_1,
        address?.address_line_2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Shipping Address
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Delivery information for this order.
                </p>
            </div>

            <div className="space-y-5 p-6">
                <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-indigo-50 p-3">
                        <User className="h-5 w-5 text-indigo-600" />
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Recipient
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-900">
                            {address?.name || "-"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-emerald-50 p-3">
                        <Phone className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Phone Number
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                            {address?.phone || "-"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-orange-50 p-3">
                        <Home className="h-5 w-5 text-orange-600" />
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Address
                        </p>

                        <p className="mt-1 text-sm leading-6 text-gray-700">
                            {fullAddress || "-"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Location
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                            {[address?.city, address?.state]
                                .filter(Boolean)
                                .join(", ") || "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ShippingCard.propTypes = {
    address: PropTypes.shape({
        name: PropTypes.string,
        phone: PropTypes.string,
        address_line_1: PropTypes.string,
        address_line_2: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        postal_code: PropTypes.string,
        country: PropTypes.string,
    }),
};

ShippingCard.defaultProps = {
    address: {},
};

export default ShippingCard;