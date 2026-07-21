import { formatCurrency } from "../../../utils/formatters/currency";

import "./OrderItems.css";

function OrderItems({ items = [] }) {
    return (
        <section className="order-items-card">

            <h2>Ordered Items</h2>

            {items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                items.map((item) => (
                    <div
                        className="order-item"
                        key={item.id}
                    >
                        <div className="order-item-info">

                            <h3>{item.product_name}</h3>

                            <div className="order-item-meta">

                                <span>
                                    Size: {item.size || "-"}
                                </span>

                                <span>
                                    Color: {item.color || "-"}
                                </span>

                                <span>
                                    Qty: {item.quantity}
                                </span>

                            </div>

                            <div className="order-item-sku">
                                SKU: {item.sku}
                            </div>

                        </div>

                        <div className="order-item-price">
                            {formatCurrency(item.total_price)}
                        </div>

                    </div>
                ))
            )}

        </section>
    );
}

export default OrderItems;