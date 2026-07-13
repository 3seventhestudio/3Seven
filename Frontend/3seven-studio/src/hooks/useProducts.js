import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export default function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProducts(filters);
      console.log("API Response:", response);

      setProducts(response.results?.data || []);
    } catch (err) {
      setError("Unable to load products.");
      console.error(err);
      setProducts([]);
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