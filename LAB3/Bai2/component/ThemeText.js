import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "../context/SettingsContext";

const ThemeText = ({ style, children, ...props }) => {
  const { colors, fontSize } = useContext(ThemeContext);
  return (
    <Text style={[{ color: colors.text, fontSize }, style]} {...props}>
      {children}
    </Text>
  );
};

export default ThemeText;
