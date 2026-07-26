import { BadgeCheck, Star } from "lucide-react";

const ReviewCard = ({ review }) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {review.customer_name}
                        </h3>

                        {review.verified_purchase && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                <BadgeCheck size={14} />
                                Verified Purchase
                            </span>
                        )}

                        {review.is_featured && (
                            <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                                Featured
                            </span>
                        )}
                    </div>

                    <div className="mt-3 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={18}
                                className={
                                    star <= review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                </div>
            </div>

            <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900">
                    {review.title}
                </h4>

                <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">
                    {review.comment}
                </p>
            </div>

            {review.images?.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {review.images.map((image) => (
                        <img
                            key={image.id}
                            src={image.image}
                            alt=""
                            className="aspect-square w-full rounded-xl border border-gray-200 object-cover transition duration-300 hover:scale-105"
                        />
                    ))}
                </div>
            )}

            {review.admin_reply && (
                <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-900">
                        Reply from 3Seven Studio
                    </div>

                    <p className="leading-7 text-gray-600">
                        {review.admin_reply}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ReviewCard;