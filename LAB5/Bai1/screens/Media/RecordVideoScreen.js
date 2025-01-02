import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import { CameraView } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";

export default function RecordVideoScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const cameraRef = useRef(null);

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      setVideoUri(video.uri);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        await cameraRef.current.stopRecording();
        setIsRecording(false);
      } catch (error) {
        Alert.alert("Error", "Failed to stop recording.");
        console.error(error);
      }
    }
  };

  const saveVideo = async () => {
    if (videoUri) {
      try {
        await MediaLibrary.createAssetAsync(videoUri);
        Alert.alert("Success", "Video saved successfully.");
      } catch (error) {
        Alert.alert("Error", "Failed to save video.");
        console.error(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      {videoUri ? (
        <View style={styles.videoPreview}>
          <Video
            source={{ uri: videoUri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            style={styles.video}
          />
          <TouchableOpacity style={styles.button} onPress={saveVideo}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.recordButton}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <Icon
                name={isRecording ? "stop" : "video-camera"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  recordButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 50,
  },
  recordButtonText: {
    color: "white",
    fontSize: 18,
  },
  videoPreview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 300,
  },
  button: {
    backgroundColor: "#28A745",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
