import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const ThemeView = ({ children, style }) => {
  const { themeColor } = useContext(ThemeContext);

  const getBackgroundColor = () => {};

  return (
    <View style={[style, { backgroundColor: themeColor.bgContainer }]}>
      {children}
    </View>
  );
};

export default ThemeView;
