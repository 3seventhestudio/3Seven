import { Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import "./QuantitySelector.css";

function QuantitySelector({

    value = 1,

    min = 1,

    max = 10,

    onChange,

}) {

    const [quantity, setQuantity] = useState(value);

    useEffect(() => {

        setQuantity(value);

    }, [value]);

    const decrease = () => {

        if (quantity <= min) return;

        const newQty = quantity - 1;

        setQuantity(newQty);

        onChange?.(newQty);

    };

    const increase = () => {

        if (quantity >= max) return;

        const newQty = quantity + 1;

        setQuantity(newQty);

        onChange?.(newQty);

    };

    return (

        <div className="quantity-selector">

            <button
                type="button"
                onClick={decrease}
            >
                <Minus size={18} />
            </button>

            <span>{quantity}</span>

            <button
                type="button"
                onClick={increase}
            >
                <Plus size={18} />
            </button>

        </div>

    );

}

export default QuantitySelector;