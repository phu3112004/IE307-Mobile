import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/AuthContext"; // Context chứa thông tin người dùng
import BookList from "../../component/BookList"; // Component hiển thị danh sách sách
import { getBookById } from "../../helps/helps"; // Import hàm getBookById
import { ScrollView } from "react-native-gesture-handler";
import ThemeText from "../../component/ThemeText";
import { ThemeContext } from "../../context/ThemeContext";
import ThemeView from "../../component/ThemeView";

export default function RecentBooks() {
  const { userToken } = useContext(AuthContext); // Lấy thông tin người dùng hiện tại
  const [books, setBooks] = useState([]); // Mảng lưu trữ tất cả sách của người dùng
  const [loading, setLoading] = useState(true); // Trạng thái loading khi tải sách
  const { themeColor } = useContext(ThemeContext); // Lấy themeColor từ ThemeContext

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookIds = userToken.recent || []; // Mảng các id sách của người dùng

        // Sử dụng Promise.all để tải tất cả sách theo ID
        const userBooks = await Promise.all(
          bookIds.map(async (id) => {
            const book = await getBookById(id); // Lấy từng sách theo ID
            return book; // Trả về sách tìm được
          })
        );

        setBooks(userBooks.filter((book) => book !== null)); // Cập nhật danh sách sách cho người dùng
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [userToken.recent]); // Khi userToken.recent thay đổi thì gọi lại

  if (loading) {
    return (
      <ThemeView style={styles.container}>
        <ActivityIndicator size="large" color="#cf3339" />
      </ThemeView>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColor.bgContainer }]}
    >
      <ThemeText style={styles.title}>Recent Books</ThemeText>
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <Text style={styles.noBooks}>No books read recently.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  noBooks: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
