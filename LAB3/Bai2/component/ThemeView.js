import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../context/SettingsContext";

const ThemeView = ({ style, children, ...props }) => {
  const { colors } = useContext(ThemeContext);
  return (
    <View style={[{ backgroundColor: colors.background }, style]} {...props}>
      {children}
    </View>
  );
};

export default ThemeView;
