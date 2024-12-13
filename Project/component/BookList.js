import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import BookItem from "./BookItem"; // Import BookItem Component

const BookList = ({ books }) => {
  const [visibleBooks, setVisibleBooks] = useState([]); // Sách hiện tại hiển thị
  const [loading, setLoading] = useState(true); // Trạng thái tải thêm sách ban đầu là true
  const [currentIndex, setCurrentIndex] = useState(4); // Chỉ số cuốn sách hiện tại (hiển thị 4 cuốn đầu tiên)
  const [numColumns, setNumColumns] = useState(2); // Quản lý số cột trong FlatList

  useEffect(() => {
    if (books.length > 0) {
      setVisibleBooks(books.slice(0, 4)); // Hiển thị 4 cuốn đầu tiên khi render
      setLoading(false); // Đặt loading là false khi đã có sách
    }
  }, [books]);

  const handleLoadMore = () => {
    if (loading || currentIndex >= books.length) return; // Tránh tải khi đang tải hoặc không còn sách
    setLoading(true);
    const nextIndex = currentIndex + 4; // Tải thêm 4 cuốn
    const moreBooks = books.slice(currentIndex, nextIndex); // Lấy 4 cuốn tiếp theo
    setVisibleBooks([...visibleBooks, ...moreBooks]); // Cập nhật danh sách sách hiển thị
    setCurrentIndex(nextIndex); // Cập nhật chỉ số sách hiện tại
    setLoading(false); // Dừng trạng thái loading
  };

  return (
    <View>
      {loading && books.length === 0 ? (
        <ActivityIndicator
          size="large"
          color="#cf3339"
          style={styles.loadingIndicator}
        />
      ) : (
        <>
          <FlatList
            key={numColumns} // Thêm key prop để đảm bảo FlatList render lại khi số cột thay đổi
            data={visibleBooks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <BookItem item={item} />
              </View>
            )} // Sử dụng BookItem component
            contentContainerStyle={styles.listContainer}
            numColumns={numColumns} // Hiển thị 2 item trên 1 hàng
            columnWrapperStyle={styles.columnWrapper} // Điều chỉnh khoảng cách giữa các item trên cùng hàng
          />
          {currentIndex < books.length && !loading && (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={handleLoadMore}
            >
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: "space-between", // Đảm bảo khoảng cách giữa các item
  },
  itemContainer: {
    flex: 1,
    maxWidth: "50%", // Đảm bảo mỗi item chỉ chiếm 50% width
    padding: 5, // Thêm padding để tạo khoảng cách giữa các item
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  loadMoreButton: {
    backgroundColor: "#cf3339",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  loadMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookList;
