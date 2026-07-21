import {
    FaHome,
    FaEdit,
    FaTrash,
    FaCheckCircle,
} from "react-icons/fa";

import "./AddressCard.css";

function AddressCard({
    address,
    onEdit,
    onDelete,
    onDefault,
}) {
    return (
        <div className="address-card">

            <div className="address-card-header">

                <div className="address-title">

                    <FaHome />

                    <span>
                        {address.address_type || "Address"}
                    </span>

                </div>

                {address.is_default && (
                    <span className="default-badge">
                        Default
                    </span>
                )}

            </div>

            <div className="address-body">

                <h4>
                    {address.full_name}
                </h4>

                <p>
                    {address.phone_number}
                </p>

                <p>
                    {address.address_line_1}
                </p>

                {address.address_line_2 && (
                    <p>
                        {address.address_line_2}
                    </p>
                )}

                {address.landmark && (
                    <p>
                        {address.landmark}
                    </p>
                )}

                <p>
                    {address.city}, {address.state}
                </p>

                <p>
                    {address.country} - {address.postal_code}
                </p>

            </div>

            <div className="address-actions">

                {!address.is_default && (

                    <button
                        className="address-btn default-btn"
                        onClick={() => onDefault(address.id)}
                    >
                        <FaCheckCircle />
                        Set Default
                    </button>

                )}

                <button
                    className="address-btn edit-btn"
                    onClick={() => onEdit(address)}
                >
                    <FaEdit />
                    Edit
                </button>

                <button
                    className="address-btn delete-btn"
                    onClick={() => onDelete(address.id)}
                >
                    <FaTrash />
                    Delete
                </button>

            </div>

        </div>
    );
}

export default AddressCard;