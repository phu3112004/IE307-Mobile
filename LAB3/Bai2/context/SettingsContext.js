import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const SettingsContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const settings = async () => {
      const savedFontSize = await AsyncStorage.getItem("fontSize");
      const savedDarkMode = await AsyncStorage.getItem("darkMode");
      if (savedFontSize) setFontSize(JSON.parse(savedFontSize));
      if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode));
    };
    settings();
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const changeFontSize = async (size) => {
    setFontSize(size);
    await AsyncStorage.setItem("fontSize", JSON.stringify(size));
  };
  const theme = {
    colors: {
      background: isDarkMode ? "#222" : "#eee",
      text: isDarkMode ? "#fff" : "#333",
    },
    fontSize,
    isDarkMode,
    toggleDarkMode,
    changeFontSize,
  };
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
