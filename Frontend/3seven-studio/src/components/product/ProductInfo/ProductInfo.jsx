import ProductPrice from "../ProductCard/ProductPrice";

function ProductInfo({ product }) {
  return (
    <div className="product-info">

      <span className="product-category">
        {product.category}
      </span>

      <h3>
        {product.name}
      </h3>

      <ProductPrice
        price={product.price}
        comparePrice={product.comparePrice}
      />

      <div className="product-rating">
        ★ {product.rating}
        <span> ({product.reviews})</span>
      </div>

    </div>
  );
}

export default ProductInfo;