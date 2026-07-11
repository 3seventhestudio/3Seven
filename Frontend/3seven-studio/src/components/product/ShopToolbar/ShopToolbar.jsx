import "./ShopToolbar.css";
import { FiGrid, FiColumns } from "react-icons/fi";

export default function ShopToolbar({
  totalProducts,
  sortBy,
  setSortBy,
  gridColumns,
  setGridColumns,
}) {
  return (
    <div className="shop-toolbar">

      <div className="toolbar-left">
        <span>{totalProducts} Products</span>
      </div>

      <div className="toolbar-right">

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Alphabetically</option>
        </select>

        <div className="grid-buttons">

          <button
            className={gridColumns === 2 ? "active" : ""}
            onClick={() => setGridColumns(2)}
            aria-label="2 column view"
          >
            <FiColumns />
          </button>

          <button
            className={gridColumns === 3 ? "active" : ""}
            onClick={() => setGridColumns(3)}
            aria-label="3 column view"
          >
            <FiGrid />
          </button>

          <button
            className={gridColumns === 4 ? "active" : ""}
            onClick={() => setGridColumns(4)}
            aria-label="4 column view"
          >
            <span>4</span>
          </button>

        </div>

      </div>

    </div>
  );
}