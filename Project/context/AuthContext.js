import React, { useState, createContext } from "react";
import axios from "axios";
import ip from "../config/ip";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState({});

  const authContext = {
    signUp: async (name, username, password, navigation) => {
      try {
        const response = await axios.get(
          `http://${ip}:3000/users?username=${username}`
        );
        if (response.data.length > 0) {
          alert("Username is already taken");
          return;
        }

        await axios.post(`http://${ip}:3000/users`, {
          name,
          username,
          password,
        });
        alert("Sign up successful");
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error during sign up:", error);
        alert("Something went wrong. Please try again");
      }
    },
    logIn: async (username, password) => {
      try {
        const response = await axios.get(
          `http://${ip}:3000/users?username=${username}&password=${password}`
        );

        if (response.data.length === 0) {
          alert("Invalid username or password");
          return;
        }
        const token = {
          username,
          password,
          id: response.data[0].id,
          name: response.data[0].name,
        };
        setUserToken(token);
        alert("Log in successful");
      } catch (error) {
        console.error("Error during login:", error.message);
        alert("Username or password is incorrect");
      }
    },
    logOut: () => setUserToken({}),
    userToken,
    setUserToken,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
