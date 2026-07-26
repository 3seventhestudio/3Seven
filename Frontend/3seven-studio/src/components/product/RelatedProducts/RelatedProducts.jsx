import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productService";
import ProductCard from "../ProductCard/ProductCard";
import SectionHeading from "../../common/SectionHeading/SectionHeading";

import "./RelatedProducts.css";

function RelatedProducts({ category, productId }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchRelated = async () => {

            try {

                setLoading(true);

                const response = await getProducts({
                    category: category,
                    page_size: 4,
                });

                const filtered = (response.data?.results || response.data || []).filter(
                    (p) => p.id !== productId
                ).slice(0, 4);

                setProducts(filtered);

            } catch (error) {

                console.error("Failed to load related products:", error);

            } finally {

                setLoading(false);

            }

        };

        if (category) {
            fetchRelated();
        }

    }, [category, productId]);

    if (loading || products.length === 0) {
        return null;
    }

    return (

        <section className="related-products-section">

            <SectionHeading
                title="You May Also Like"
                subtitle="Explore more from this collection"
            />

            <div className="related-products-grid">

                {products.map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        </section>

    );

}

export default RelatedProducts;