import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export default function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts(filters);

      setProducts(response.data);
    } catch (err) {
      setError("Unable to load products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]);

  return {
    products,
    loading,
    error,
    refresh: fetchProducts,
  };
}