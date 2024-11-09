import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { ThemeContext } from "../context/SettingsContext";
import ThemeView from "../component/ThemeView";
import ThemeText from "../component/ThemeText";

const SettingsScreen = () => {
  const { isDarkMode, fontSize, toggleDarkMode, changeFontSize, colors } =
    useContext(ThemeContext);

  return (
    <ThemeView style={styles.container}>
      <ThemeView style={styles.switchContainer}>
        <ThemeText>Chế độ tối</ThemeText>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </ThemeView>

      <ThemeView style={styles.sliderContainer}>
        <ThemeText>Kích thước chữ:</ThemeText>
        <ThemeText>{fontSize}px</ThemeText>
      </ThemeView>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={12}
        maximumValue={32}
        step={2}
        value={fontSize}
        onValueChange={changeFontSize}
        minimumTrackTintColor="#1e90ff"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1e90ff"
      />
    </ThemeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default SettingsScreen;
