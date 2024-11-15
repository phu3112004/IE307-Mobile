import * as SQLite from "expo-sqlite";

// Mở cơ sở dữ liệu đồng bộ
const db = SQLite.openDatabaseSync("notes.db");

// Tạo bảng nếu chưa tồn tại
export const createTable = async () => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
    );`
  );
};

// Lấy tất cả các ghi chú
export const getNotes = async (callback) => {
  try {
    const result = await db.getAllAsync("SELECT * FROM notes");
    callback(result);
  } catch (error) {
    console.error("Error getting notes:", error);
  }
};

// Thêm ghi chú mới
export const addNote = async (title, content, callback) => {
  await db.runAsync("INSERT INTO notes (title, content) VALUES (?, ?)", [
    title,
    content,
  ]);
  callback();
};

// Cập nhật ghi chú
export const updateNote = async (id, title, content, callback) => {
  await db.runAsync("UPDATE notes SET title = ?, content = ? WHERE id = ?", [
    title,
    content,
    id,
  ]);
  callback();
};

// Xóa ghi chú
export const deleteNote = async (id, callback) => {
  await db.runAsync("DELETE FROM notes WHERE id = ?", [id]);
  callback();
};
