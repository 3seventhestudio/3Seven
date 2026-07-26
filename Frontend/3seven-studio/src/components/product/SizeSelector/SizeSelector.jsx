import "./SizeSelector.css";

function SizeSelector({
    variants = [],
    value = "",
    onChange,
}) {

    const sizes = [...new Map(
        variants.map(item => [
            item.size,
            item,
        ])
    ).values()];

    const activeSize = value || (sizes.length > 0 ? sizes[0].size : "");

    const handleSelect = (size) => {
        onChange?.(size);
    };

    if (!sizes.length) return null;

    return (

        <div className="size-selector">

            <h4>Select Size</h4>

            <div className="size-list">

                {sizes.map((item) => (

                    <button
                        key={item.size}
                        type="button"
                        className={activeSize === item.size ? "active" : ""}
                        onClick={() => handleSelect(item.size)}
                    >
                        {item.size}
                    </button>

                ))}

            </div>

        </div>

    );

}

export default SizeSelector;