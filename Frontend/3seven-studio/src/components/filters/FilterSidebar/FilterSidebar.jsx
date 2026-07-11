import "./FilterSidebar.css";

const categories = [
  "All",
  "Straight Fit",
  "Slim Fit",
  "Wide Leg",
  "Mom Fit",
  "Bootcut",
  "Flare",
  "Loose Fit",
];

const sizes = ["26", "28", "30", "32", "34"];

const washes = [
  "Light Wash",
  "Medium Wash",
  "Dark Wash",
  "Black",
];

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedSize,
  setSelectedSize,
  selectedWash,
  setSelectedWash,
  onlyNew,
  setOnlyNew,
  clearFilters,
}) {
  return (
    <div className="filter-sidebar">

      <div className="filter-header">

        <h3>Filters</h3>

        <button
          onClick={clearFilters}
          className="clear-btn"
        >
          Clear
        </button>

      </div>

      <div className="filter-section">

        <h4>Category</h4>

        {categories.map((category) => (
          <label key={category} className="filter-option">

            <input
              type="radio"
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(category)}
            />

            {category}

          </label>
        ))}

      </div>

      <div className="filter-section">

        <h4>Size</h4>

        <div className="size-grid">

          {sizes.map((size) => (

            <button
              key={size}
              className={
                selectedSize === size
                  ? "size-btn active"
                  : "size-btn"
              }
              onClick={() =>
                setSelectedSize(
                  selectedSize === size ? "" : size
                )
              }
            >
              {size}
            </button>

          ))}

        </div>

      </div>

      <div className="filter-section">

        <h4>Wash</h4>

        {washes.map((wash) => (

          <label
            key={wash}
            className="filter-option"
          >

            <input
              type="radio"
              checked={selectedWash === wash}
              onChange={() => setSelectedWash(wash)}
            />

            {wash}

          </label>

        ))}

      </div>

      <div className="filter-section">

        <label className="filter-option">

          <input
            type="checkbox"
            checked={onlyNew}
            onChange={(e) =>
              setOnlyNew(e.target.checked)
            }
          />

          Show New Arrivals

        </label>

      </div>

    </div>
  );
}