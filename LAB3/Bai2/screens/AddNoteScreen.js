import React from "react";
import NoteInput from "../component/NoteInput";

const AddNote = ({ navigation }) => {
  return <NoteInput navigation={navigation} type="add" />;
};

export default AddNote;
