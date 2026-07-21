import {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {

    const [selectedAddress, setSelectedAddress] = useState(null);

    const [paymentMethod, setPaymentMethod] = useState("cod");

    const [notes, setNotes] = useState("");

    const [placingOrder, setPlacingOrder] = useState(false);

    const value = useMemo(
        () => ({
            selectedAddress,
            setSelectedAddress,

            paymentMethod,
            setPaymentMethod,

            notes,
            setNotes,

            placingOrder,
            setPlacingOrder,
        }),
        [
            selectedAddress,
            paymentMethod,
            notes,
            placingOrder,
        ]
    );

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {

    const context = useContext(CheckoutContext);

    if (!context) {
        throw new Error(
            "useCheckout must be used within CheckoutProvider."
        );
    }

    return context;
}