import React, { useState, createContext } from "react";
import { ToastAndroid } from "react-native";
import axios from "axios";
import ip from "../config/ip";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState({
    id: null,
    name: null,
    username: null,
    books: [],
  });

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const authContext = {
    signUp: async (name, username, password, navigation) => {
      if (!name || !username || !password) {
        showToast("Fields cannot be empty!");
        return;
      }

      try {
        const response = await axios.get(
          `http://${ip}:3000/users?username=${username}`
        );
        if (response.data.length > 0) {
          showToast("Username is already taken");
          return;
        }

        await axios.post(`http://${ip}:3000/users`, {
          name,
          username,
          password,
          books: [],
          recent: [],
        });
        showToast("Sign up successful");
        navigation.navigate("Login");
      } catch (error) {
        showToast("Something went wrong. Please try again");
      }
    },

    logIn: async (username, password) => {
      if (!username || !password) {
        showToast("Fields cannot be empty!");
        return;
      }

      try {
        const response = await axios.get(
          `http://${ip}:3000/users?username=${username}&password=${password}`
        );

        if (response.data.length === 0) {
          showToast("Invalid username or password");
          return;
        }

        const user = response.data[0];
        const token = {
          id: user.id,
          name: user.name,
          username: user.username,
          books: user.books || [],
          recent: user.recent || [],
        };
        setUserToken(token);
        showToast("Log in successful");
      } catch (error) {
        showToast("Username or password is incorrect");
      }
    },

    logOut: () => {
      setUserToken({
        id: null,
        name: null,
        username: null,
        books: [],
        recent: [],
      });
      showToast("Logged out successfully");
    },

    userToken,
    setUserToken,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
