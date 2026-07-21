import "./OrderAddress.css";

function OrderAddress({ address }) {
    if (!address) return null;

    return (
        <section className="order-address-card">
            <h2>Shipping Address</h2>

            <div className="address-content">

                <p className="address-name">
                    {address.full_name}
                </p>

                <p>{address.phone_number}</p>

                <p>{address.address_line_1}</p>

                {address.address_line_2 && (
                    <p>{address.address_line_2}</p>
                )}

                {address.landmark && (
                    <p>{address.landmark}</p>
                )}

                <p>
                    {address.city}, {address.state}
                </p>

                <p>
                    {address.country} - {address.postal_code}
                </p>

                <span className="address-type">
                    {address.address_type}
                </span>

            </div>
        </section>
    );
}

export default OrderAddress;