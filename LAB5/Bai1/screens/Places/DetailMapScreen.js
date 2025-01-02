import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function DetailMapScreen({ route }) {
  const { latitude, longitude } = route.params;
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    if (latitude && longitude) {
      setIsDataReady(true);
    }
  }, [latitude, longitude]);

  if (!isDataReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: latitude || 10.839568,
          longitude: longitude || 106.656351,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          tracksViewChanges={false}
        />
      </MapView>
    </View>
  );
}
