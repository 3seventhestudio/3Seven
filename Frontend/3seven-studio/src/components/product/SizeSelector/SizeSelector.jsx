import { useEffect, useState } from "react";
import "./SizeSelector.css";

function SizeSelector({

    variants = [],

    onChange,

}) {

    const sizes = [...new Map(

        variants.map(item => [

            item.size,

            item,

        ])

    ).values()];

    const [selected, setSelected] = useState(null);

    useEffect(() => {

        if (sizes.length) {

            setSelected(sizes[0].size);

            onChange?.(sizes[0].size);

        }

    }, [variants]);

    const handleSelect = (size) => {

        setSelected(size);

        onChange?.(size);

    };

    return (

        <div className="size-selector">

            <h4>

                Select Size

            </h4>

            <div className="size-list">

                {

                    sizes.map((item) => (

                        <button

                            key={item.size}

                            className={
                                selected === item.size
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                handleSelect(item.size)
                            }

                        >

                            {item.size}

                        </button>

                    ))

                }

            </div>

        </div>

    );

}

export default SizeSelector;