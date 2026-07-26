import { useState, useEffect } from "react";
import { X, Star, ImagePlus } from "lucide-react";

const defaultForm = {
    rating: 5,
    title: "",
    comment: "",
    images: [],
};

function ReviewModal({
    open,
    loading = false,
    review = null,
    onClose,
    onSubmit,
}) {
    const [formData, setFormData] = useState(defaultForm);

    useEffect(() => {
        if (review) {
            setFormData({
                rating: review.rating,
                title: review.title,
                comment: review.comment,
                images: [],
            });
        } else {
            setFormData(defaultForm);
        }
    }, [review]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b px-8 py-6">

                    <h2 className="text-2xl font-semibold">
                        {review ? "Edit Review" : "Write Review"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-8"
                >

                    <div>

                        <label className="mb-3 block font-medium">
                            Rating
                        </label>

                        <div className="flex gap-2">

                            {[1,2,3,4,5].map((star)=>(
                                <button
                                    key={star}
                                    type="button"
                                    onClick={()=>setFormData({
                                        ...formData,
                                        rating: star,
                                    })}
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

                        <label className="mb-2 block font-medium">
                            Title
                        </label>

                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-xl border px-4 py-3"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Review
                        </label>

                        <textarea
                            rows={6}
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            className="w-full rounded-xl border px-4 py-3"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-3 block font-medium">
                            Images
                        </label>

                        <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-8">

                            <div className="text-center">

                                <ImagePlus
                                    className="mx-auto mb-3"
                                    size={34}
                                />

                                <p>Upload Images</p>

                            </div>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={(e)=>
                                    setFormData({
                                        ...formData,
                                        images: Array.from(e.target.files),
                                    })
                                }
                            />

                        </label>

                    </div>

                    <button
                        disabled={loading}
                        className="w-full rounded-xl bg-black py-4 font-medium text-white"
                    >
                        {loading
                            ? "Submitting..."
                            : review
                                ? "Update Review"
                                : "Submit Review"}
                    </button>

                </form>

            </div>
        </div>
    );
}

export default ReviewModal;