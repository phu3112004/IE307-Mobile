import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import { getAllBooks } from "../helps/helps";
import BookList from "./../component/BookList";

export default function HomeScreen() {
  const [books, setBooks] = useState([]);
  const [hotBooks, setHotBooks] = useState([]);
  const width = Dimensions.get("window").width;

  useEffect(() => {
    const fetchProducts = async () => {
      const allBooks = await getAllBooks(10, 20);
      setBooks(allBooks);
      const randomBooks = await getAllBooks(10, 14);
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
    <ScrollView style={styles.container}>
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
          books={hotBooks}
          onBookPress={(book) => console.log("Selected Book:", book)}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.subHeader}>Our Books</Text>
        <BookList
          books={books}
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
