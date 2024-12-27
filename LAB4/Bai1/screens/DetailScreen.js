import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

export default function DetailScreen({ route, navigation }) {
  const { data } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: data.title });
  }, [data, navigation]);

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.description}>{data.description}</Text>
      <Text style={styles.price}>Price: ${data.price}</Text>
      <View style={styles.ratingContainer}>
        <Text>Rating: </Text>
        <Text style={styles.ratingText}>{data.rating.rate}</Text>
        <Icon name="star" size={20} color="#FFD700" style={styles.starIcon} />
        <Text style={styles.ratingText}>({data.rating.count} reviews)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "justify",
    lineHeight: 22,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#cf3339",
    marginBottom: 10,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  starIcon: {
    marginRight: 5,
  },
  ratingText: {
    fontSize: 16,
    color: "#333",
  },
});
