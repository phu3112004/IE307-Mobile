import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  BackHandler,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native"; // Import các hook
import Carousel from "react-native-reanimated-carousel";
import { getAllBooks } from "../helps/helps";
import BookList from "./../component/BookList";
import { ThemeContext } from "../context/ThemeContext";

export default function HomeScreen() {
  const [books, setBooks] = useState([]);
  const [hotBooks, setHotBooks] = useState([]);
  const width = Dimensions.get("window").width;
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  const navigation = useNavigation(); // Khởi tạo navigation
  const isFocused = useIsFocused(); // Kiểm tra xem trang hiện tại có phải là HomeScreen không
  const { themeColor } = useContext(ThemeContext); // Lấy themeColor từ ThemeContext

  useEffect(() => {
    const backAction = () => {
      // Chỉ thực hiện thoát ứng dụng nếu đang ở trang HomeScreen
      if (isFocused) {
        if (backPressedOnce) {
          BackHandler.exitApp(); // Thoát ứng dụng nếu nhấn lần thứ hai
        } else {
          setBackPressedOnce(true); // Đánh dấu nhấn lần đầu
          ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT); // Hiển thị thông báo
          setTimeout(() => setBackPressedOnce(false), 2000); // Reset trạng thái sau 2 giây
        }
      } else {
        navigation.goBack(); // Quay lại trang trước nếu không phải trang Home
      }

      return true; // Ngăn hành vi quay lại mặc định
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Gỡ listener khi component bị unmount
  }, [backPressedOnce, isFocused, navigation]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allBooks = await getAllBooks();
      setBooks(allBooks);

      // Chọn 8 cuốn sách đầu tiên làm sách hot
      const randomBooks = allBooks.slice(9, 13);
      setHotBooks(randomBooks);
    };

    fetchProducts();
  }, []);

  const bannerData = [
    {
      uri: "https://www.thebookseller.com/AcuCustom/Sitename/DAM/434/Books_1920_X_1080_copy.jpg",
    },
    {
      uri: "https://www.eluniversity.co.za/wp-content/uploads/2021/11/GettyImages-577674005-1004x565.jpg",
    },
    {
      uri: "https://www.publishcentral.com.au/wp-content/uploads/2023/05/book-pile-of-must-read-books-scaled1.jpeg",
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColor.bgContainer }]}
    >
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={bannerData}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.itemContainer}>
        <Text style={styles.subHeader}>Hot Books</Text>
        <BookList
          books={hotBooks} // Truyền danh sách sách hot
          onBookPress={(book) => console.log("Selected Book:", book)}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.subHeader}>Our Books</Text>
        <BookList
          books={books} // Truyền toàn bộ danh sách sách
          onBookPress={(book) => console.log("Selected Book:", book)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    color: "#cf3339",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  subHeader: {
    fontSize: 22,
    color: "#cf3339",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  itemContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
