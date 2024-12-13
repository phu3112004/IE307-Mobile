import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getAllBooks } from "../helps/helps";
import BookList from "../component/BookList";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmedQuery, setConfirmedQuery] = useState(""); // Từ khóa đã xác nhận
  const [results, setResults] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getAllBooks(1, 100);
      setBooks(response);
    };
    fetchBooks();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true); // Bật trạng thái loading
    setConfirmedQuery(searchQuery); // Cập nhật từ khóa đã xác nhận
    // Mô phỏng tìm kiếm sách
    setTimeout(() => {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredBooks);
      setIsLoading(false); // Tắt trạng thái loading
    }, 1000); // Giả lập thời gian tải (1 giây)
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for books..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearch} // Kích hoạt tìm kiếm khi nhấn Enter
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {isLoading ? ( // Hiển thị loading khi đang tải
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          {confirmedQuery && (
            <Text style={styles.resultText}>
              Result of keyword: {`"${confirmedQuery}"`}
            </Text>
          )}
          {results.length > 0 ? (
            <BookList books={results} />
          ) : (
            confirmedQuery && (
              <Text style={styles.noResults}>No results found</Text>
            )
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  noResults: {
    marginTop: 16,
    fontSize: 16,
    color: "#888",
  },
});

export default SearchScreen;
