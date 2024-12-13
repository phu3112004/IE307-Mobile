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

export default function BookDetail({ route, navigation }) {
  const { id, title, author, releaseDate, language, image } = route.params;
  const { userToken, setUserToken } = useContext(AuthContext); // Lấy thông tin người dùng từ context

  // Kiểm tra xem sách đã tồn tại trong thư viện hay chưa
  const isBookAdded = userToken.books.includes(id);

  const handleSaveBook = async () => {
    try {
      // Nếu sách đã tồn tại, không thực hiện thêm
      if (isBookAdded) {
        ToastAndroid.show(
          "This book is already in your library!",
          ToastAndroid.SHORT
        );
        return;
      }

      // Cập nhật danh sách sách của người dùng, thêm sách vào đầu mảng
      const updatedBooks = [id, ...userToken.books];

      // Gửi yêu cầu cập nhật dữ liệu lên server
      await axios.patch(`http://${ip}:3000/users/${userToken.id}`, {
        books: updatedBooks,
      });

      // Cập nhật lại state userToken trong ứng dụng
      setUserToken({ ...userToken, books: updatedBooks });

      // Hiển thị thông báo thành công bằng ToastAndroid
      ToastAndroid.show("Book added to your library!", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error adding book to library:", error);
      ToastAndroid.show(
        "Something went wrong, please try again.",
        ToastAndroid.LONG
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.text}>Released: {releaseDate}</Text>
      <Text style={styles.text}>Language: {language}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BookContent", { id })}
      >
        <Text style={styles.buttonText}>Read Content</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          isBookAdded && styles.disabledButton, // Áp dụng style cho nút khi đã thêm
        ]}
        onPress={handleSaveBook} // Xử lý lưu sách vào thư viện
        disabled={isBookAdded} // Vô hiệu hóa nút nếu sách đã được thêm
      >
        <Text style={styles.buttonText}>
          {isBookAdded ? "Already in Library" : "Save to Library"}
        </Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: "red",
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
    backgroundColor: "#ccc", // Thay đổi màu sắc nút khi bị vô hiệu hóa
  },
});
