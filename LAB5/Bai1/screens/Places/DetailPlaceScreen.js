import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DetailPlaceScreen({ route, navigation }) {
  const { place } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: place.title,
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: place.image_path }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.address}>{place.address}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("DetailMap", {
              latitude: place.latitude,
              longitude: place.longitude,
            })
          }
        >
          <Icon name="map" size={20} color="white" />
          <Text style={styles.buttonText}>View on map</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 480,
    resizeMode: "cover",
    marginBottom: 15,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  address: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#cf3339",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
    width: 200,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});
