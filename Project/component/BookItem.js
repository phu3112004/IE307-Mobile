import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const BookItem = ({ item }) => {
  const navigation = useNavigation(); // Sử dụng navigation

  return (
    <TouchableOpacity
      style={styles.itemContainer}
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
        <Text style={styles.bookTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
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
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
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
    color: "#333",
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
