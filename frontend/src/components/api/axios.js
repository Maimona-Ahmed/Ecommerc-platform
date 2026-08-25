
import axios from "axios";


const api = axios.create({

  baseURL: "http://127.0.0.1:8000/api",

  headers: {
    "Content-Type": "application/json",
  },

});


// =================================
// Request Interceptor
// =================================

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("access");


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);


// =================================
// Response Interceptor
// =================================

api.interceptors.response.use(

  (response) => {

    return response;

  },


  async (error) => {

    const originalRequest =
      error.config;


    // Access token expired

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;


      const refreshToken =
        localStorage.getItem("refresh");


      // No refresh token

      if (!refreshToken) {

        localStorage.removeItem(
          "access"
        );

        localStorage.removeItem(
          "refresh"
        );

        return Promise.reject(error);

      }


      try {

        // Request new access token

        const response =
          await axios.post(

            "http://127.0.0.1:8000/api/auth/token/refresh/",

            {
              refresh: refreshToken,
            }

          );


        const newAccessToken =
          response.data.access;


        // Save new token

        localStorage.setItem(
          "access",
          newAccessToken
        );


        // Update original request

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;


        // Retry original request

        return api(
          originalRequest
        );


      } catch (refreshError) {

        // Refresh token expired

        localStorage.removeItem(
          "access"
        );

        localStorage.removeItem(
          "refresh"
        );


        return Promise.reject(
          refreshError
        );

      }

    }


    return Promise.reject(error);

  }

);


export default api;
