import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const themeColor = {
    backgroundColor:
      theme === "dark" ? "#121212" : theme === "light" ? "#fff" : "#fef6d3",
    bgContainer:
      theme === "dark" ? "#1e1e1e" : theme === "light" ? "#f8f8f8" : "#fff8dc",
    color: theme === "dark" ? "#fff" : theme === "light" ? "#000" : "#333",
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
