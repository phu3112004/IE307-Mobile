import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const ThemeView = ({ children, style }) => {
  const { theme } = useContext(ThemeContext);

  const getBackgroundColor = () => {
    switch (theme) {
      case "dark":
        return "#333";
      case "eye":
        return "#fef6d3";
      default:
        return "#fff";
    }
  };

  return (
    <View style={[style, { backgroundColor: getBackgroundColor() }]}>
      {children}
    </View>
  );
};

export default ThemeView;
