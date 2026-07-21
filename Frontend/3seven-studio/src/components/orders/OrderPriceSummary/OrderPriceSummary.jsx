import { formatCurrency } from "../../../utils/formatters/currency";

import "./OrderPriceSummary.css";

function OrderPriceSummary({ order }) {
    if (!order) return null;

    return (
        <section className="order-price-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
            </div>

            <div className="summary-row">
                <span>Shipping</span>
                <span>{formatCurrency(order.shipping_charge)}</span>
            </div>

            <div className="summary-row">
                <span>COD Charges</span>
                <span>{formatCurrency(order.cod_charge)}</span>
            </div>

            <div className="summary-row">
                <span>GST</span>
                <span>{formatCurrency(order.gst)}</span>
            </div>

            {Number(order.discount) > 0 && (
                <div className="summary-row discount">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discount)}</span>
                </div>
            )}

            <hr />

            <div className="summary-row grand-total">
                <span>Grand Total</span>
                <span>{formatCurrency(order.grand_total)}</span>
            </div>

        </section>
    );
}

export default OrderPriceSummary;