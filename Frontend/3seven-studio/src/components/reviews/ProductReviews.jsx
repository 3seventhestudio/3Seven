import { useEffect, useState } from "react";

import { getProductReviews } from "../../services/reviewService";

import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";

const ProductReviews = ({ productSlug }) => {
    const [summary, setSummary] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const response = await getProductReviews(productSlug);

                setSummary(response.data.summary);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error(error);
            }
        };

        if (productSlug) {
            loadReviews();
        }
    }, [productSlug]);

    return (
        <section className="mt-24 border-t border-gray-200 pt-20">
            <div className="mb-12">
                <h2 className="text-4xl font-semibold">
                    Customer Reviews
                </h2>

                <p className="mt-3 text-gray-500">
                    Genuine reviews from verified customers.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <ReviewSummary summary={summary} />
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <ReviewList reviews={reviews} />
                </div>
            </div>
        </section>
    );
};

export default ProductReviews;