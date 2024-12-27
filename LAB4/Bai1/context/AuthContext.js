import React, { useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");

  const authContext = {
    logIn: async (username, password) => {
      try {
        const response = await axios.post(
          "https://fakestoreapi.com/auth/login",
          {
            username,
            password,
          }
        );
        const token = response.data.token;
        setUserToken(token);
        return token;
      } catch (error) {
        alert("Username or password is incorrect");
        throw new Error("Username or password is incorrect");
      }
    },
    logOut: () => setUserToken(""),
    userToken,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
