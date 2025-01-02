import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { getPlaces, createTable } from "../../database/places";
import { useFocusEffect } from "@react-navigation/native";

export default function ListPlaceScreen({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddPlace")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      createTable();
      getPlaces(setPlaces);
      setLoading(false);
    }, [])
  );

  const renderPlaceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() => navigation.navigate("DetailPlace", { place: item })}
    >
      <Image source={{ uri: item.image_path }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <Text style={styles.placeTitle}>{item.title}</Text>
        <Text style={styles.placeCoordinates}>
          {item.address || "Unknown address"}
        </Text>
      </View>
    </TouchableOpacity>
  );
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#cf3339" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {places.length > 0 ? (
        <FlatList
          data={places}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPlaceItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={{ textAlign: "center" }}>
          No places added yet! Start adding some.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#cf3339",
    borderRadius: 50,
    marginRight: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  placeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  placeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  placeInfo: {
    marginLeft: 15,
    flex: 1,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  placeCoordinates: {
    fontSize: 14,
    color: "#555",
  },
});
