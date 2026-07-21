import { useEffect, useState } from "react";
import { getProduct } from "../services/productService";

export default function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProduct(slug);

        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return {
    product,
    loading,
    error,
  };
}