import axiosInstance from "./axios";

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");

    // Only attach the token if it actually exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If the user is not authenticated,
    // simply allow the request to fail.
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refresh_token");

    // No refresh token → Guest user
    if (!refreshToken) {
      localStorage.removeItem("access_token");
      return Promise.reject(error);
    }

    // Prevent infinite retry loops
    if (originalRequest._retry) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await axiosInstance.post(
        "/accounts/refresh/",
        {
          refresh: refreshToken,
        }
      );

      const newAccessToken = response.data.access;

      localStorage.setItem(
        "access_token",
        newAccessToken
      );

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);

    } catch (refreshError) {

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      return Promise.reject(refreshError);

    }
  }
);

export default axiosInstance;