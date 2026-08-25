
import { createContext, useState } from "react";
import api from "../api/axios";


export const AuthContext =
  createContext(null);


function AuthProvider({ children }) {

  const [user, setUser] =
    useState(null);


  const [accessToken, setAccessToken] =
    useState(
      localStorage.getItem("access")
    );


  const [refreshToken, setRefreshToken] =
    useState(
      localStorage.getItem("refresh")
    );


  // =========================
  // Login
  // =========================

  const login = async (
    email,
    password
  ) => {

    try {

      const response =
        await api.post(
          "/auth/login/",
          {
            email,
            password,
          }
        );


      const data =
        response.data;


      // Save tokens

      localStorage.setItem(
        "access",
        data.access
      );

      localStorage.setItem(
        "refresh",
        data.refresh
      );


      // Update state

      setAccessToken(
        data.access
      );

      setRefreshToken(
        data.refresh
      );

      setUser(
        data.user
      );


      return {
        success: true,
      };


    } catch (error) {

      return {

        success: false,

        message:
          error.response?.data?.detail ||
          "Login failed",

      };

    }

  };


  // =========================
  // Logout
  // =========================

  const logout = () => {

    localStorage.removeItem(
      "access"
    );

    localStorage.removeItem(
      "refresh"
    );


    setAccessToken(null);

    setRefreshToken(null);

    setUser(null);

  };


  return (

    <AuthContext.Provider
      value={{

        user,

        accessToken,

        refreshToken,

        login,

        logout,

        isLoggedIn:
          !!accessToken,

      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


export default AuthProvider;
