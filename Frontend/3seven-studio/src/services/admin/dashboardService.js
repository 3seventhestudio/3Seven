import api from "../../api/api";

export const getDashboardStats = async () => {
    const response = await api.get("/accounts/admin/dashboard/");
    return response.data;
};
