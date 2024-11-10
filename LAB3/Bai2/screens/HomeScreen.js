import { FlatList } from "react-native";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useCallback, useState } from "react";
import { ThemeContext } from "../context/SettingsContext";
import { useFocusEffect } from "@react-navigation/native";
import ThemeText from "../component/ThemeText";
import ThemeView from "../component/ThemeView";
import { getNotes, deleteNote } from "../db/database";
import Icon from "react-native-vector-icons/FontAwesome";

export default function HomeScreen({ navigation }) {
  const { isDarkMode, colors } = useContext(ThemeContext);
  const [notes, setNotes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getNotes(setNotes);
    }, [])
  );

  const handleDeleteNote = (id) => {
    deleteNote(id, () => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    });
  };
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

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        style={styles.notesContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteContainer}
            onPress={() =>
              navigation.navigate("EditNote", {
                noteId: item.id,
                title: item.title,
                content: item.content,
              })
            }
          >
            <ThemeView style={styles.note}>
              <ThemeText style={styles.noteTitle}>{item.title}</ThemeText>
              <ThemeText>{item.content}</ThemeText>
            </ThemeView>
            <ThemeView style={styles.delete}>
              <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
                <Icon name="trash" size={30} color={colors.text} />
              </TouchableOpacity>
            </ThemeView>
          </TouchableOpacity>
        )}
      />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  addButton: {
    backgroundColor: "#fe5300",
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: "center",
  },
  notesContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  noteContainer: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 4,
    marginVertical: 8,
    padding: 8,
    justifyContent: "space-between",
  },
  note: {
    width: "85%",
  },
  noteTitle: {
    fontWeight: "bold",
  },
  delete: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
});
