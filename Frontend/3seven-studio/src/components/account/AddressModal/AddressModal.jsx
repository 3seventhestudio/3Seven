import AddressForm from "../AddressForm/AddressForm";

import "./AddressModal.css";

function AddressModal({
    open,
    address,
    onClose,
    onSave,
    saving = false,
}) {

    if (!open) {
        return null;
    }

    return (

        <div
            className="address-modal-overlay"
            onClick={onClose}
        >

            <div
                className="address-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="address-modal-header">

                    <h2>
                        {address
                            ? "Edit Address"
                            : "Add Address"}
                    </h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <AddressForm
                    address={address}
                    onSave={onSave}
                    onCancel={onClose}
                    saving={saving}
                />

            </div>

        </div>

    );

}

export default AddressModal;