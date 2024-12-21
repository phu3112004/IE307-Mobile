import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { getBookById } from "../../helps/helps";
import { ThemeContext } from "../../context/ThemeContext";
import ThemeText from "../ThemeText";
import ThemeView from "../ThemeView";

export default function BookContent({ route }) {
  const { id } = route.params; // Nhận id từ navigation
  const [bookDetails, setBookDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1500; // Số ký tự tối đa trên mỗi trang
  const { themeColor } = useContext(ThemeContext);

  // Tạo ref cho ScrollView
  const scrollViewRef = useRef(null);

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

  // Tách nội dung theo từ để không bị cắt giữa từ
  const splitContentByWords = (content, maxLength) => {
    const words = content.split(" ");
    const pages = [];
    let currentPage = "";

    for (const word of words) {
      if ((currentPage + word).length <= maxLength) {
        currentPage += word + " ";
      } else {
        pages.push(currentPage.trim());
        currentPage = word + " ";
      }
    }
    if (currentPage) {
      pages.push(currentPage.trim());
    }

    return pages;
  };

  const contentPages = splitContentByWords(bookDetails.content, itemsPerPage);

  // Hàm xử lý khi chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Cuộn lên đầu trang
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[styles.container, { backgroundColor: themeColor.bgContainer }]}
    >
      <ThemeText style={styles.title}>{bookDetails.title}</ThemeText>
      <Text style={styles.author}>Author: {bookDetails.author}</Text>
      <ThemeText style={styles.content}>
        {contentPages[currentPage - 1]}
      </ThemeText>

      {/* Nút phân trang */}
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            currentPage === 1 && styles.disabledButton,
          ]}
          onPress={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={styles.buttonText}>Trước</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>
          Trang {currentPage} / {contentPages.length}
        </Text>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            currentPage === contentPages.length && styles.disabledButton,
          ]}
          onPress={() =>
            currentPage < contentPages.length &&
            handlePageChange(currentPage + 1)
          }
          disabled={currentPage === contentPages.length}
        >
          <Text style={styles.buttonText}>Sau</Text>
        </TouchableOpacity>
      </View>
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
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  paginationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#cf3339",
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
