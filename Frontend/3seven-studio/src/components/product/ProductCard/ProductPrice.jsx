function ProductPrice({ price, comparePrice }) {
  return (
    <div className="product-price">

      <span className="sale-price">
        ₹{price}
      </span>

      {comparePrice && (
        <span className="compare-price">
          ₹{comparePrice}
        </span>
      )}

    </div>
  );
}

export default ProductPrice;