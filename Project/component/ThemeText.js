import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const ThemeText = ({ children, style }) => {
  const { themeColor } = useContext(ThemeContext);

  return <Text style={[style, { color: themeColor.color }]}>{children}</Text>;
};

export default ThemeText;
