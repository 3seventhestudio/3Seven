import PropTypes from "prop-types";
import { Save } from "lucide-react";

const INPUT_CLASS =
    "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500";

const LABEL_CLASS =
    "block text-sm font-medium text-gray-700";

const OrderUpdateForm = ({
    formData,
    onChange,
    onSubmit,
    saving = false,
}) => {
    return (
        <form
            onSubmit={onSubmit}
            className="rounded-xl border border-gray-200 bg-white shadow-sm"
        >
            <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Update Order
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Update order status and shipping information.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

                <div>
                    <label className={LABEL_CLASS}>
                        Order Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={onChange}
                        className={INPUT_CLASS}
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="returned">Returned</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>

                <div>
                    <label className={LABEL_CLASS}>
                        Payment Status
                    </label>

                    <select
                        name="payment_status"
                        value={formData.payment_status}
                        onChange={onChange}
                        className={INPUT_CLASS}
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>

                <div>
                    <label className={LABEL_CLASS}>
                        Shipping Provider
                    </label>

                    <input
                        type="text"
                        name="shipping_provider"
                        value={formData.shipping_provider}
                        onChange={onChange}
                        className={INPUT_CLASS}
                    />
                </div>

                <div>
                    <label className={LABEL_CLASS}>
                        Courier Name
                    </label>

                    <input
                        type="text"
                        name="courier_name"
                        value={formData.courier_name}
                        onChange={onChange}
                        className={INPUT_CLASS}
                    />
                </div>

                <div>
                    <label className={LABEL_CLASS}>
                        Courier Service
                    </label>

                    <input
                        type="text"
                        name="courier_service"
                        value={formData.courier_service}
                        onChange={onChange}
                        className={INPUT_CLASS}
                    />
                </div>

                <div>
                    <label className={LABEL_CLASS}>
                        Shipment ID
                    </label>

                    <input
                        type="text"
                        name="shipment_id"
                        value={formData.shipment_id}
                        onChange={onChange}
                        className={INPUT_CLASS}
                    />
                </div>

                <div>
                    <label className={LABEL_CLASS}>
                        Tracking Number
                    </label>

                    <input
                        type="text"
                        name="tracking_number"
                        value={formData.tracking_number}
                        onChange={onChange}
                        className={INPUT_CLASS}
                    />
                </div>

                <div>
                    <label className={LABEL_CLASS}>
                        Tracking URL
                    </label>

                    <input
                        type="url"
                        name="tracking_url"
                        value={formData.tracking_url}
                        onChange={onChange}
                        className={INPUT_CLASS}
                    />
                </div>

                <div className="lg:col-span-2">
                    <label className={LABEL_CLASS}>
                        Notes
                    </label>

                    <textarea
                        rows={5}
                        name="notes"
                        value={formData.notes}
                        onChange={onChange}
                        className={INPUT_CLASS}
                    />
                </div>

            </div>

            <div className="flex justify-end border-t border-gray-100 px-6 py-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Save className="h-4 w-4" />

                    {saving ? "Saving..." : "Update Order"}
                </button>
            </div>
        </form>
    );
};

OrderUpdateForm.propTypes = {
    formData: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    saving: PropTypes.bool,
};

export default OrderUpdateForm;