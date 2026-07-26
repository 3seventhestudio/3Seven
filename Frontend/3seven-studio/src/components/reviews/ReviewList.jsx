import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-8 py-16 text-center">
                <h3 className="text-2xl font-semibold text-gray-900">
                    No Reviews Yet
                </h3>

                <p className="mt-3 text-gray-500">
                    Be the first customer to review this product.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-900">
                    Customer Reviews
                </h3>

                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                    {reviews.length} Review{reviews.length > 1 ? "s" : ""}
                </span>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReviewList;