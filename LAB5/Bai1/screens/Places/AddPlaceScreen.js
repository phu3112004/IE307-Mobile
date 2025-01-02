import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { addPlace, createTable } from "../../database/places";
import { convertCoordinatesToAddress } from "../../utils/index";
import { sendNotification } from "../../utils/notify";
import MapView, { Marker } from "react-native-maps";

export default function AddPlaceScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [location, setLocation] = useState(null);

  const handleAddPlace = async () => {
    if (!title || !selectedImage || !location) {
      Alert.alert("Missing information", "Please fill in all fields.");
      return;
    }

    try {
      const address = await convertCoordinatesToAddress(
        location.latitude,
        location.longitude
      );
      await createTable();
      await addPlace(
        title,
        selectedImage,
        location.latitude,
        location.longitude,
        address,
        () => {
          sendNotification(
            "Place added successfully",
            "The place has been added successfully to the list."
          );
          navigation.navigate("Places");
        }
      );
    } catch (error) {
      console.error("Error adding place:", error);
      Alert.alert("Error", "Could not add the place. Please try again.");
    }
  };

  const pickImageHandler = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhotoHandler = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === "granted");
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your camera.");
      return;
    }

    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
    if (!mediaLibraryPermission.granted) {
      Alert.alert(
        "Permission required",
        "Please allow access to save images to your gallery."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);

      // Lưu ảnh vào thư viện máy
      try {
        const asset = await MediaLibrary.createAssetAsync(imageUri);
        Alert.alert("Image Saved", "The photo has been saved to your gallery.");
      } catch (error) {
        console.error("Error saving image:", error);
        Alert.alert("Error", "Could not save the image. Please try again.");
      }
    }
  };

  const getCurrentLocationHandler = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please allow access to your location to use this feature."
      );
      return;
    }

    const locationResult = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setLocation({
      latitude: locationResult.coords.latitude,
      longitude: locationResult.coords.longitude,
    });
  };

  const pickLocationOnMapHandler = () => {
    if (!location) {
      getCurrentLocationHandler();
    }
    navigation.navigate("Map", {
      currentLocation: location,
      setLocation: (newLocation) => setLocation(newLocation),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.imagePicker}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholder}>
              No image selected or taken yet.
            </Text>
          </View>
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={pickImageHandler}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhotoHandler}>
            <Text style={styles.buttonText}>Take Image</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.locationSection}>
        {location ? (
          <View
            style={{
              width: "100%",
              height: 180,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              />
            </MapView>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholder}>No location picked yet.</Text>
          </View>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={getCurrentLocationHandler}
          >
            <Text style={styles.buttonText}>Locate User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={pickLocationOnMapHandler}
          >
            <Text style={styles.buttonText}>Pick on Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={handleAddPlace}
      >
        <Text style={styles.buttonText}>Add Place</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholderContainer: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 14,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#cf3339",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  locationLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#28A745",
    marginTop: 10,
  },
});
