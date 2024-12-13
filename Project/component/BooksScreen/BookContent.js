import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { getAllBooks } from "../../helps/helps"; // Đảm bảo bạn import hàm getAllBooks đúng cách

export default function BookContent({ route }) {
  const { id } = route.params; // Nhận id từ navigation
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const allBooks = await getAllBooks(); // Gọi API lấy tất cả sách
      const book = allBooks.find((book) => book.id === id); // Tìm sách theo ID
      if (book) {
        setBookDetails(book); // Lưu dữ liệu sách vào state
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!bookDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" /> {/* Hiệu ứng xoay vòng */}
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Nền tùy chỉnh */}
      <View style={styles.backgroundContainer}>
        {/* Ảnh sách */}
        <Image
          source={{ uri: bookDetails.image }}
          style={styles.image}
        />
      </View>

      {/* Tiêu đề sách */}
      <Text style={styles.title}>{bookDetails.title}</Text>
      {/* Tác giả sách */}
      <Text style={styles.author}>Author: {bookDetails.author}</Text>
      {/* Nội dung sách */}
      <Text style={styles.content}>{bookDetails.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
    backgroundColor: "#fff",
  },
  backgroundContainer: {
    width: "100%",
    height: 250,         // Chiều cao của background
    backgroundColor: "#f0f0f0", // Màu nền tùy chỉnh
    borderRadius: 10,     // Làm tròn các góc nếu muốn
    position: "relative", // Đảm bảo có thể đặt vị trí cho ảnh
    overflow: "hidden",   // Giới hạn phần dư ra ngoài
    marginBottom: 20,     // Khoảng cách giữa background và nội dung bên dưới
  },
  image: {
    width: "150%",        // Đặt chiều rộng ảnh lớn hơn để 50% nằm ngoài nền
    height: "100%",       // Đặt chiều cao ảnh cho vừa với chiều cao của background
    position: "absolute", // Đặt ảnh ở vị trí tuyệt đối trong container
    left: "-25%",         // Dịch chuyển ảnh sang trái 25% để 50% nằm ngoài
    resizeMode: "contain", // Đảm bảo ảnh không bị cắt xén
    top: 0,               // Đảm bảo ảnh bắt đầu từ vị trí trên cùng
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", // Căn giữa tiêu đề
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "300", // Làm chữ nhẹ hơn
    color: "#777", // Màu nhạt hơn
    textAlign: "center", // Căn giữa tên tác giả
    marginBottom: 20, // Khoảng cách giữa tác giả và nội dung
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
