import api from "../api/api";

export const getProductReviews = async (slug) => {
    const response = await api.get(`/reviews/products/${slug}/`);
    return response.data;
};

export const getReview = async (reviewId) => {
    const response = await api.get(`/reviews/${reviewId}/`);
    return response.data;
};

export const createReview = async (productSlug, data) => {
    const formData = new FormData();

    formData.append("order_item_id", data.order_item_id);
    formData.append("rating", data.rating);
    formData.append("title", data.title);
    formData.append("comment", data.comment);

    if (data.images?.length) {
        data.images.forEach((image) => {
            formData.append("images", image);
        });
    }

    const response = await api.post(
        `/reviews/products/${productSlug}/create/`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const updateReview = async (reviewId, data) => {
    const formData = new FormData();

    formData.append("rating", data.rating);
    formData.append("title", data.title);
    formData.append("comment", data.comment);

    if (data.images?.length) {
        data.images.forEach((image) => {
            formData.append("images", image);
        });
    }

    const response = await api.put(
        `/reviews/${reviewId}/`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const deleteReview = async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}/`);
    return response.data;
};

export const getAdminReviews = async (params = {}) => {
    const response = await api.get("/reviews/admin/", {
        params,
    });

    return response.data;
};

export const updateAdminReview = async (reviewId, data) => {
    const response = await api.put(
        `/reviews/admin/${reviewId}/`,
        data
    );

    return response.data;
};