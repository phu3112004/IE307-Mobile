import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";

export default function MapScreen({ route }) {
  const navigation = useNavigation();
  const { setLocation } = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={handleSaveLocation}>
          <Icon name="check" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [selectedLocation]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Please allow access to your location."
          );
          setIsLoading(false);
          return;
        }

        const locationResult = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setCurrentLocation(locationResult.coords);
      } catch (error) {
        Alert.alert("Error", "Unable to fetch location");
      } finally {
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);

  const handleSaveLocation = () => {
    if (selectedLocation) {
      setLocation(selectedLocation);
      navigation.goBack();
    } else {
      Alert.alert(
        "No location selected",
        "Please select a location on the map."
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cf3339" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude || 10.807064,
          longitude: currentLocation.longitude || 106.642628,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={(event) => {
          const coords = event.nativeEvent.coordinate;
          setSelectedLocation(coords);
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#cf3339",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
