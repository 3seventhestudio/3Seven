import { Star } from "lucide-react";

const ReviewSummary = ({ summary }) => {
    if (!summary) return null;

    const averageRating = Number(summary.average_rating || 0);
    const totalReviews = Number(summary.total_reviews || 0);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="text-center border-b border-gray-100 pb-8">
                <h3 className="text-lg font-semibold text-gray-900">
                    Overall Rating
                </h3>

                <div className="mt-4 text-6xl font-bold text-black">
                    {averageRating.toFixed(1)}
                </div>

                <div className="mt-4 flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={22}
                            className={
                                star <= Math.round(averageRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                            }
                        />
                    ))}
                </div>

                <p className="mt-4 text-sm text-gray-500">
                    Based on {totalReviews} customer reviews
                </p>
            </div>

            <div className="mt-8 space-y-4">
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = summary.distribution?.[star] || 0;

                    const percentage =
                        totalReviews > 0
                            ? (count / totalReviews) * 100
                            : 0;

                    return (
                        <div
                            key={star}
                            className="flex items-center gap-4"
                        >
                            <div className="w-8 text-sm font-medium">
                                {star}★
                            </div>

                            <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-black transition-all duration-500"
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />
                            </div>

                            <div className="w-8 text-right text-sm text-gray-500">
                                {count}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default ReviewSummary;