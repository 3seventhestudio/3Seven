import PropTypes from "prop-types";
import { ImageIcon, Package } from "lucide-react";

const formatCurrency = (value) => {
    const amount = Number(value || 0);

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
    }).format(amount);
};

const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

    return `${baseUrl}${image}`;
};

const OrderItemsTable = ({ items }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Order Items
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Products included in this order.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Product
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                SKU
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Size
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Color
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Qty
                            </th>

                            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Unit Price
                            </th>

                            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Total
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">
                        {items.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-12 text-center"
                                >
                                    <Package className="mx-auto mb-3 h-10 w-10 text-gray-300" />

                                    <p className="text-sm text-gray-500">
                                        No products found.
                                    </p>
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                                                {item.product_image ? (
                                                    <img
                                                        src={getImageUrl(
                                                            item.product_image
                                                        )}
                                                        alt={item.product_name}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display =
                                                                "none";
                                                            e.target.nextSibling.style.display =
                                                                "flex";
                                                        }}
                                                    />
                                                ) : null}

                                                <div
                                                    className={`${
                                                        item.product_image
                                                            ? "hidden"
                                                            : "flex"
                                                    } h-full w-full items-center justify-center`}
                                                >
                                                    <ImageIcon className="h-6 w-6 text-gray-400" />
                                                </div>
                                            </div>

                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {item.product_name}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {item.product_slug}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-sm text-gray-700">
                                        {item.sku}
                                    </td>

                                    <td className="px-4 py-4 text-center text-sm text-gray-700">
                                        {item.size || "-"}
                                    </td>

                                    <td className="px-4 py-4 text-center text-sm text-gray-700">
                                        {item.color || "-"}
                                    </td>

                                    <td className="px-4 py-4 text-center font-semibold text-gray-900">
                                        {item.quantity}
                                    </td>

                                    <td className="px-4 py-4 text-right text-sm text-gray-700">
                                        {formatCurrency(item.unit_price)}
                                    </td>

                                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                                        {formatCurrency(item.total_price)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

OrderItemsTable.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            product_name: PropTypes.string.isRequired,
            product_slug: PropTypes.string,
            product_image: PropTypes.string,
            sku: PropTypes.string,
            size: PropTypes.string,
            color: PropTypes.string,
            quantity: PropTypes.number,
            unit_price: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            total_price: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
        })
    ),
};

OrderItemsTable.defaultProps = {
    items: [],
};

export default OrderItemsTable;