import { useState } from "react";

import "./ShippingMethod.css";

function ShippingMethod() {

    const [shippingMethod, setShippingMethod] = useState("standard");

    return (

        <div className="checkout-card">

            <h2>Delivery Method</h2>

            <label className="shipping-option">

                <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shippingMethod === "standard"}
                    onChange={(e) =>
                        setShippingMethod(e.target.value)
                    }
                />

                <div>

                    <strong>Standard Delivery</strong>

                    <p>
                        Delivery within 3–7 business days.
                    </p>

                </div>

                <span className="shipping-price">

                    FREE

                </span>

            </label>

        </div>

    );

}

export default ShippingMethod;