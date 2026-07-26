import PropTypes from "prop-types";
import { Mail, Phone, User } from "lucide-react";

const CustomerCard = ({ customer }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Customer Information
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Customer details for this order.
                </p>
            </div>

            <div className="space-y-5 p-6">
                <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-indigo-50 p-3">
                        <User className="h-5 w-5 text-indigo-600" />
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Customer Name
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-900">
                            {customer?.name || "-"}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-50 p-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Email Address
                        </p>

                        <p className="mt-1 break-all text-sm text-gray-700">
                            {customer?.email || "-"}
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
                            {customer?.phone || "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

CustomerCard.propTypes = {
    customer: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
    }),
};

CustomerCard.defaultProps = {
    customer: {
        name: "",
        email: "",
        phone: "",
    },
};

export default CustomerCard;