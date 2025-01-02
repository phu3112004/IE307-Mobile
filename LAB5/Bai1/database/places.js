import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("places.db");

export const createTable = async () => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image_path TEXT, 
    latitude REAL NOT NULL,  
    longitude REAL NOT NULL,  
    address TEXT NOT NULL
    );`
  );
};

export const addPlace = async (
  title,
  imagePath,
  latitude,
  longitude,
  address,
  callback
) => {
  await db.runAsync(
    "INSERT INTO places (title, image_path, latitude, longitude, address) VALUES (?, ?, ?, ?, ?)",
    [title, imagePath, latitude, longitude, address]
  );
  callback();
};

// Lấy tất cả các ghi chú
export const getPlaces = async (callback) => {
  try {
    const result = await db.getAllAsync("SELECT * FROM places");
    callback(result);
  } catch (error) {
    console.error("Error getting places:", error);
  }
};

// Cập nhật ghi chú
export const updatePlace = async (id, title, content, callback) => {
  await db.runAsync("UPDATE places SET title = ?, content = ? WHERE id = ?", [
    title,
    content,
    id,
  ]);
  callback();
};

// Xóa ghi chú
export const deletePlace = async (id, callback) => {
  await db.runAsync("DELETE FROM places WHERE id = ?", [id]);
  callback();
};
