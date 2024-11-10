import React from "react";
import { useRoute } from "@react-navigation/native";
import NoteInput from "../component/NoteInput";

export default function EditNoteScreen({ navigation }) {
  const route = useRoute();
  const { noteId, title, content } = route.params;

  return (
    <NoteInput
      navigation={navigation}
      title_p={title}
      content_p={content}
      noteId={noteId}
      type="edit"
    />
  );
}
