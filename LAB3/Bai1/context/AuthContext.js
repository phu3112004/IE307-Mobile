import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  const authContext = {
    logIn: () => setUserToken("dummy-token"),
    logOut: () => setUserToken(null),
    userToken: userToken,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
