import api from "../../api/api";

export const getCategories = async (params = {}) => {
    const response = await api.get("/admin/categories/", { params });
    return response.data;
};

export const getCategory = async (id) => {
    const response = await api.get(`/admin/categories/${id}/`);
    return response.data;
};

export const createCategory = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined) {
            formData.append(key, data[key]);
        }
    });

    const response = await api.post(
        "/admin/categories/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const updateCategory = async (id, data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined) {
            formData.append(key, data[key]);
        }
    });

    const response = await api.put(
        `/admin/categories/${id}/`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await api.delete(`/admin/categories/${id}/`);
    return response.data;
};

export const getCategoryDropdown = async () => {
    const response = await api.get("/admin/categories/dropdown/");
    return response.data;
};