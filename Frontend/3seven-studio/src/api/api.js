import axiosInstance from "./axios";
import axios from "axios";


const clearAuth = () => {

    localStorage.removeItem(
        "access_token"
    );

    localStorage.removeItem(
        "refresh_token"
    );

    localStorage.removeItem(
        "user"
    );

    window.dispatchEvent(
        new Event("auth-logout")
    );

};



const refreshClient = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://127.0.0.1:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});



let isRefreshing = false;

let refreshSubscribers = [];



const subscribeTokenRefresh = (
    callback
) => {

    refreshSubscribers.push(
        callback
    );

};



const onRefreshSuccess = (
    token
) => {

    refreshSubscribers.forEach(
        (callback) =>
            callback(token)
    );

    refreshSubscribers = [];

};



const onRefreshFailed = () => {

    refreshSubscribers = [];

};



/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

axiosInstance.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem(
                "access_token"
            );


        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    },


    (error) =>
        Promise.reject(error)

);



/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

axiosInstance.interceptors.response.use(

    (response) =>
        response,


    async (error) => {


        const originalRequest =
            error.config;



        if (
            error.response?.status !== 401
        ) {

            return Promise.reject(error);

        }



        /*
        Never refresh refresh request
        */

        if (
            originalRequest.url.includes(
                "/accounts/refresh/"
            )
        ) {

            clearAuth();

            return Promise.reject(error);

        }



        if (
            originalRequest._retry
        ) {

            clearAuth();

            return Promise.reject(error);

        }



        const refreshToken =
            localStorage.getItem(
                "refresh_token"
            );



        if (!refreshToken) {

            clearAuth();

            return Promise.reject(error);

        }



        /*
        Wait if refresh already running
        */

        if (isRefreshing) {


            return new Promise(
                (resolve) => {


                    subscribeTokenRefresh(
                        (token) => {

                            originalRequest.headers.Authorization =
                                `Bearer ${token}`;


                            resolve(
                                axiosInstance(
                                    originalRequest
                                )
                            );

                        }
                    );


                }
            );


        }



        originalRequest._retry = true;

        isRefreshing = true;



        try {


            const response =
                await refreshClient.post(
                    "/accounts/refresh/",
                    {
                        refresh:
                            refreshToken,
                    }
                );



            const newAccessToken =
                response.data.access;



            localStorage.setItem(
                "access_token",
                newAccessToken
            );



            onRefreshSuccess(
                newAccessToken
            );



            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;



            return axiosInstance(
                originalRequest
            );



        } catch (refreshError) {


            onRefreshFailed();


            clearAuth();


            return Promise.reject(
                refreshError
            );


        } finally {


            isRefreshing = false;


        }


    }

);


export default axiosInstance;