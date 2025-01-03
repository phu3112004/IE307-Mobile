import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import ip from "../../config/ip";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import ThemeView from "../ThemeView";
import ThemeText from "../ThemeText";

export default function BookDetail({ route, navigation }) {
  const { id, title, author, releaseDate, language, image } = route.params;
  const { userToken, setUserToken } = useContext(AuthContext); // Lấy thông tin người dùng từ context

  const isBookAdded = userToken.books.includes(id);

  const handleSaveBook = async () => {
    try {
      if (isBookAdded) {
        // Nếu sách đã có trong thư viện, xóa sách khỏi thư viện
        const updatedBooks = userToken.books.filter((bookId) => bookId !== id);
        await axios.patch(`http://${ip}:3000/users/${userToken.id}`, {
          books: updatedBooks,
        });
        setUserToken({ ...userToken, books: updatedBooks });
        ToastAndroid.show(
          "Book removed from your library!",
          ToastAndroid.SHORT
        );
      } else {
        // Nếu sách chưa có trong thư viện, thêm sách vào thư viện (thêm vào cuối)
        const updatedBooks = [...userToken.books, id]; // Thêm sách vào cuối
        await axios.patch(`http://${ip}:3000/users/${userToken.id}`, {
          books: updatedBooks,
        });
        setUserToken({ ...userToken, books: updatedBooks });
        ToastAndroid.show("Book added to your library!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error updating library:", error);
      ToastAndroid.show(
        "Something went wrong, please try again.",
        ToastAndroid.LONG
      );
    }
  };

  const handleReadBook = async () => {
    try {
      // Kiểm tra và khởi tạo mảng recent nếu nó chưa có
      const currentRecent = userToken.recent || []; // Nếu recent chưa có, khởi tạo mảng rỗng

      // Nếu sách đã có trong recent, xóa khỏi mảng và thêm vào đầu
      const updatedRecent = [id, ...currentRecent.filter((bookId) => bookId !== id)]; // Thêm vào đầu mảng recent
      await axios.patch(`http://${ip}:3000/users/${userToken.id}`, {
        recent: updatedRecent,
      });
      setUserToken({ ...userToken, recent: updatedRecent }); // Cập nhật lại userToken

      // Chuyển đến trang nội dung sách
      navigation.navigate("BookContent", { id });
    } catch (error) {
      console.error("Error updating recent books:", error);
      ToastAndroid.show(
        "Something went wrong, please try again.",
        ToastAndroid.LONG
      );
    }
  };

  return (
    <ThemeView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <ThemeText style={styles.title}>{title}</ThemeText>
      <Text style={styles.author}>{author}</Text>
      <ThemeText style={styles.text}>Released: {releaseDate}</ThemeText>
      <ThemeText style={styles.text}>Language: {language}</ThemeText>

      <TouchableOpacity
        style={styles.button}
        onPress={handleReadBook} // Gọi handleReadBook khi nhấn nút
      >
        <Text style={styles.buttonText}>Read Content</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isBookAdded && styles.disabledButton]} // Áp dụng style cho nút khi đã thêm
        onPress={handleSaveBook} // Xử lý lưu sách vào thư viện hoặc xóa sách khỏi thư viện
        disabled={isBookAdded && false} // Không vô hiệu hóa nút, vì có thể xóa sách
      >
        <Text style={styles.buttonText}>
          {isBookAdded ? "Remove from Library" : "Save to Library"}
        </Text>
      </TouchableOpacity>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#cf3339",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
