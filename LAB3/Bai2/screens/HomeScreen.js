import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/SettingsContext";
import ThemeText from "../component/ThemeText";
import ThemeView from "../component/ThemeView";
export default function HomeScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <ThemeView style={styles.container}>
      <ThemeText
        style={[styles.title, { color: isDarkMode ? "#0297f9" : "#fe5300" }]}
      >
        NoteApp
      </ThemeText>
      <ThemeView style={styles.addContainer}>
        <ThemeText style={styles.noteText}>All Notes</ThemeText>
        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: isDarkMode ? "#0297f9" : "#fe5300" },
          ]}
          onPress={() => navigation.navigate("AddNote")}
        >
          <Text style={{ fontSize: 30, color: isDarkMode ? "black" : "white" }}>
            +
          </Text>
        </TouchableOpacity>
      </ThemeView>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "bold",
  },
  addContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: "#fe5300",
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: "center",
  },
});
