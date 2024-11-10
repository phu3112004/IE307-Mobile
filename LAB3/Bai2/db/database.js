import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("notes.db");

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT
      );`
    );
  });
};

export const getNotes = (callback) => {
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM notes", [], (_, { rows: { _array } }) =>
      callback(_array)
    );
  });
};

export const addNote = (title, content, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO notes (title, content) VALUES (?, ?)",
      [title, content],
      () => callback()
    );
  });
};

export const updateNote = (id, title, content, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE notes SET title = ?, content = ? WHERE id = ?",
      [title, content, id],
      () => callback()
    );
  });
};

export const deleteNote = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql("DELETE FROM notes WHERE id = ?", [id], () => callback());
  });
};
