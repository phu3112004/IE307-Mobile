import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { getBookById } from "../../helps/helps"; // Đảm bảo bạn import hàm getAllBooks đúng cách
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ThemeText from "../ThemeText";
import ThemeView from "../ThemeView";

export default function BookContent({ route }) {
  const { id } = route.params; // Nhận id từ navigation
  const [bookDetails, setBookDetails] = useState(null);
  const { themeColor } = useContext(ThemeContext);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const book = await getBookById(id);
      if (book) {
        setBookDetails(book); // Lưu dữ liệu sách vào state
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!bookDetails) {
    // Hiển thị ActivityIndicator khi đang tải dữ liệu
    return (
      <ThemeView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cf3339" />
      </ThemeView>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColor.bgContainer }]}
    >
      <View style={styles.backgroundContainer}>
        <Image source={{ uri: bookDetails.image }} style={styles.image} />
      </View>
      <ThemeText style={styles.title}>{bookDetails.title}</ThemeText>
      <Text style={styles.author}>Author: {bookDetails.author}</Text>
      <ThemeText style={styles.content}>{bookDetails.content}</ThemeText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  backgroundContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "transparent",
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "150%",
    height: "100%",
    position: "absolute",
    left: "-25%",
    resizeMode: "contain",
    top: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "300",
    color: "#777",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
