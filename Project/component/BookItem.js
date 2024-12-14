import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ThemeText from "./ThemeText";

const BookItem = ({ item }) => {
  const navigation = useNavigation(); // Sử dụng navigation
  const { theme } = useContext(ThemeContext); // Lấy themeColor từ ThemeContext
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        theme === "dark"
          ? { backgroundColor: "#222" }
          : theme === "light"
          ? { backgroundColor: "#fff" }
          : { backgroundColor: "#fffce0" },
        { borderColor: theme === "dark" ? "#444" : "#ddd" },
      ]}
      onPress={() =>
        navigation.navigate("BookDetail", {
          id: item.id,
          title: item.title,
          author: item.author,
          releaseDate: item.releaseDate,
          language: item.language,
          image: item.image,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <ThemeText
          style={styles.bookTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </ThemeText>
        <Text style={styles.bookAuthor}>by {item.author}</Text>
        <Text style={styles.bookDate}>Released: {item.releaseDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 8,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
  },
  bookImage: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    borderRadius: 5,
  },
  bookInfo: {
    marginTop: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  bookDate: {
    fontSize: 12,
    color: "#999",
  },
});

export default BookItem;
