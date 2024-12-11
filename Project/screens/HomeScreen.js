import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import { getAllBooks } from "../helps/helps";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [books, setBooks] = useState([]);
  const width = Dimensions.get("window").width;

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllBooks();
      setBooks(products);
    };

    fetchProducts();
  }, []);

  const bannerData = [
    {
      uri: "https://intphcm.com/data/upload/banner-thoi-trang.jpg",
    },
    {
      uri: "https://cdn.shopify.com/s/files/1/1115/6326/files/B1004_Diamonds_banner_3_thumb_e01734f7-45ee-4a5d-a2c6-cd722e1f0a23.jpg?v=1511876038",
    },
    {
      uri: "https://img.freepik.com/free-vector/flat-design-electronics-store-facebook-cover_23-2151098080.jpg",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Shopping is cheaper than psychiatrist</Text>
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
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
          numColumns={2}
          nestedScrollEnabled={true}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.productItemImage}
              />
              <Text>{item.title}</Text>
              <Text>{item.author}</Text>
              <Text>{item.releaseDate}</Text>
              <Text>{item.language}</Text>
            </View>
          )}
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
    borderRadius: 10,
  },
  itemContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  flatListContent: {
    marginLeft: -5,
  },
  productItem: {
    width: Dimensions.get("window").width / 2 - 15,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  productItemImage: {
    width: "100%",
    height: 200,
  },
});
