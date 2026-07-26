import { useState } from "react";
import { Star, ImagePlus } from "lucide-react";

const defaultValues = {
    rating: 5,
    title: "",
    comment: "",
    images: [],
};

const ReviewForm = ({
    initialValues = defaultValues,
    loading = false,
    onSubmit,
}) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRating = (rating) => {
        setFormData((prev) => ({
            ...prev,
            rating,
        }));
    };

    const handleImages = (e) => {
        setFormData((prev) => ({
            ...prev,
            images: Array.from(e.target.files),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-8 py-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                    Write a Review
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    Share your experience with this product.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 p-8"
            >
                <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                        Rating
                    </label>

                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() =>
                                    handleRating(star)
                                }
                                className="transition hover:scale-110"
                            >
                                <Star
                                    size={30}
                                    className={
                                        star <= formData.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                    }
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Review Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Summarize your experience"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Your Review
                    </label>

                    <textarea
                        rows={6}
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Tell other customers what you liked about this product..."
                        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        required
                    />
                </div>

                <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                        Upload Images
                    </label>

                    <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-8 transition hover:border-black hover:bg-gray-50">
                        <div className="text-center">
                            <ImagePlus
                                size={34}
                                className="mx-auto mb-3 text-gray-400"
                            />

                            <p className="font-medium">
                                Click to upload
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                PNG, JPG, JPEG
                            </p>

                            {formData.images.length > 0 && (
                                <p className="mt-4 text-sm font-medium text-black">
                                    {formData.images.length} image(s)
                                    selected
                                </p>
                            )}
                        </div>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImages}
                            className="hidden"
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-black py-4 text-sm font-semibold tracking-wide text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Submitting..."
                        : "Submit Review"}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;