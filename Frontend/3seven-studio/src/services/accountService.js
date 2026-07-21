import api from "../api/api";

/**
 * Get Logged-in User Profile
 */
export const getProfile = async () => {
    const response = await api.get("/accounts/profile/");
    return response.data.data;
};

/**
 * Update Profile
 */
export const updateProfile = async (payload) => {
    const response = await api.put(
        "/accounts/profile/",
        payload
    );

    return response.data.data;
};

/**
 * Change Password
 */
export const changePassword = async (payload) => {
    const response = await api.post(
        "/accounts/change-password/",
        payload
    );

    return response.data;
};

/**
 * Dashboard
 */
export const getDashboard = async () => {
    const response = await api.get(
        "/accounts/dashboard/"
    );

    return response.data.data;
};

const accountService = {
    getProfile,
    updateProfile,
    changePassword,
    getDashboard,
};


export default accountService;