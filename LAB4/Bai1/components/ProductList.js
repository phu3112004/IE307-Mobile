import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { addToCart } from "../database/db";

export default function ProductList({ data, navigation }) {
  const { userToken, updateCountCart, countCart } = useContext(AuthContext);
  const user = userToken !== "" ? jwtDecode(userToken) : null;

  const truncateTitle = (title, maxLength) =>
    title.length > maxLength ? title.substring(0, maxLength) + "..." : title;

  const handleAddToCart = async (userId, product) => {
    const newProduct = {
      productId: product.id,
      title: product.title,
      quantity: 1,
      price: product.price,
      image: product.image,
    };

    try {
      await addToCart(userId, newProduct);
      updateCountCart(countCart + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.flatListContent}
      numColumns={2}
      nestedScrollEnabled={true}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.productItem}
          onPress={() => {
            navigation.navigate("Detail", { data: item });
          }}
        >
          <Image source={{ uri: item.image }} style={styles.productItemImage} />
          <View style={styles.infoSection}>
            <Text style={styles.title}>{truncateTitle(item.title, 30)}</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoLeft}>
                <Text style={styles.price}>${item.price}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>{item.rating.rate}</Text>
                  <Icon name="star" size={13} color="#FFD700" />
                  <Text style={styles.ratingText}> ({item.rating.count})</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={async () => await handleAddToCart(user.sub, item)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  flatListContent: { marginLeft: -5 },
  productItem: {
    width: Dimensions.get("window").width / 2 - 15,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  productItemImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoSection: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLeft: {
    flexDirection: "column",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#cf3339",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 13,
    color: "#555",
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#cf3339",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
