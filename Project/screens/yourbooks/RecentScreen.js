import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/AuthContext"; // Context chứa thông tin người dùng
import BookList from "../../component/BookList"; // Component hiển thị danh sách sách
import { getAllBooks } from "../../helps/helps"; // Import hàm getAllBooks
import { ScrollView } from "react-native-gesture-handler";

export default function RecentBooks () {
  const { userToken } = useContext(AuthContext); // Lấy thông tin người dùng hiện tại
  const [books, setBooks] = useState([]); // Mảng lưu trữ tất cả sách của người dùng
  const [loading, setLoading] = useState(true); // Trạng thái loading khi tải sách

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Dọn dẹp mảng books trước khi tải lại dữ liệu
        setBooks([]); // Reset mảng sách
    
        // Lấy tất cả sách từ Project Gutenberg
        const allBooks = await getAllBooks();
        console.log("All Books:", allBooks); // Log tất cả các sách, kiểm tra xem có đủ 5 cuốn không
    
        // Lấy danh sách sách từ mảng books của userToken
        const bookIds = userToken.recent || []; // Mảng các id sách của người dùng
        console.log("User's book IDs:", bookIds); // Log mảng ID sách của người dùng
    
        // Lọc các sách có id trong mảng bookIds
        const userBooks = allBooks.filter(book => bookIds.includes(book.id));
        console.log("Filtered Books:", userToken.recent); // Log các sách được lọc theo id
    
        setBooks(userBooks); // Cập nhật danh sách sách cho người dùng
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, [userToken.recent]); // Khi userToken.books thay đổi thì gọi lại

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recent Books</Text>
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <Text style={styles.noBooks}>No books in your library.</Text>
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
