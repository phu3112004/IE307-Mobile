import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function MediaLibraryScreen({ navigation }) {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => navigation.navigate("RecordVideo")}
        >
          <MaterialIcons name="videocam" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchMediaFiles = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Please allow access to your media files."
          );
          return;
        }

        const media = await MediaLibrary.getAssetsAsync({
          mediaType: [
            MediaLibrary.MediaType.photo,
            MediaLibrary.MediaType.video,
          ],
          first: 16,
          sortBy: [MediaLibrary.SortBy.creationTime],
        });
        setLoading(false);
        setMediaFiles(media.assets);
      };

      fetchMediaFiles();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mediaItem}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {mediaFiles.length > 0 ? (
        <FlatList
          data={mediaFiles}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      ) : loading ? (
        <ActivityIndicator color="#cf3339" size="large" />
      ) : (
        <Text>No media files found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    padding: 10,
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mediaItem: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  cameraButton: {
    backgroundColor: "#cf3339",
    borderRadius: 30,
    width: 40,
    height: 40,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  mediaImage: {
    width: 80,
    height: 80,
    margin: 5,
  },
});
