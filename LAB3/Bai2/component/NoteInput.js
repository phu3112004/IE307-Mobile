import React, { useState, useEffect, useContext } from "react";
import { TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { addNote, createTable, updateNote } from "../db/database";
import { ThemeContext } from "../context/SettingsContext";
import Icon from "react-native-vector-icons/FontAwesome";
import ThemeView from "./ThemeView";

export default function NoteInput({
  navigation,
  title_p,
  content_p,
  type = "add",
  noteId,
}) {
  const { isDarkMode, fontSize, colors } = useContext(ThemeContext);
  const [title, setTitle] = useState(type === "add" ? "" : title_p);
  const [content, setContent] = useState(type === "add" ? "" : content_p);

  useEffect(() => {
    createTable();
  }, []);

  const handleAdd = () => {
    if (!title) {
      Alert.alert("Warning", "Please enter a title!");
      return;
    }

    addNote(title, content, () => {
      navigation.goBack();
    });
  };

  const handleEdit = () => {
    if (!title) {
      Alert.alert("Warning", "Please enter a title!");
      return;
    }

    updateNote(noteId, title, content, () => {
      navigation.goBack();
    });
  };

  return (
    <ThemeView style={styles.container}>
      <TextInput
        style={[styles.input, { fontSize: fontSize, color: colors.text }]}
        placeholder="Enter your title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={isDarkMode ? "white" : "black"}
      />
      <TextInput
        style={[
          styles.input,
          { height: 120 },
          { fontSize: fontSize, color: colors.text },
        ]}
        placeholder="Enter your note"
        value={content}
        onChangeText={setContent}
        placeholderTextColor={isDarkMode ? "white" : "black"}
        multiline
      />
      <ThemeView style={styles.action}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="close"
            size={fontSize}
            color={isDarkMode ? "black" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "green" }]}
          onPress={type === "add" ? handleAdd : handleEdit}
        >
          <Icon
            name="check"
            size={fontSize}
            color={isDarkMode ? "black" : "white"}
          />
        </TouchableOpacity>
      </ThemeView>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    minHeight: 40,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 8,
    justifyContent: "flex-start",
  },
  action: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionBtn: {
    margin: 12,
    backgroundColor: "red",
    borderRadius: 100,
    minHeight: 50,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
