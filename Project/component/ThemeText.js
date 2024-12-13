import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const ThemeText = ({ children, style }) => {
  const { theme } = useContext(ThemeContext);

  const getTextColor = () => {
    switch (theme) {
      case "dark":
        return "#fff";
      case "eye":
        return "#333";
      default:
        return "#000";
    }
  };

  return <Text style={[style, { color: getTextColor() }]}>{children}</Text>;
};

export default ThemeText;
