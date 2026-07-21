import api from "../api/api";

export const register = async (data) => {
  const response = await api.post("accounts/register/", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("accounts/login/", data);
  return response.data;
};

export const logout = async () => {
  const refresh = localStorage.getItem("refresh_token");

  if (refresh) {
    await api.post("accounts/logout/", {
      refresh,
    });
  }
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");

  const response = await api.post("accounts/refresh/", {
    refresh,
  });

  return response.data;
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