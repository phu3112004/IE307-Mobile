import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import { sendNotification } from "../../utils/notify";
export default function RecordVideoScreen({ navigation }) {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [microPermission, requestMicroPermission] = useMicrophonePermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    if (permission !== "granted") {
      try {
        requestPermission();
      } catch (error) {
        Alert.alert("Error", "Failed to get camera permission.");
        console.error(error);
        navigation.goBack();
      }
    }
    if (microPermission !== "granted") {
      try {
        requestMicroPermission();
      } catch (error) {
        Alert.alert("Error", "Failed to get microphone permission.");
        console.error(error);
        navigation.goBack();
      }
    }
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        console.log("Start recording...");
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        setVideoUri(video.uri);
        setIsRecording(false);
      } catch (error) {
        console.error("Error during recording:", error);
        Alert.alert("Error", "Failed to record video.");
        setIsRecording(false);
      }
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
        sendNotification(
          "Video saved",
          "Your video has been saved to the gallery."
        );
        navigation.goBack();
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
            resizeMode="contain"
            shouldPlay={true}
            isLooping={true}
            style={styles.video}
            useNativeControls
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setVideoUri(null)}
            >
              <Text style={styles.buttonText}>Re record</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#cf3339" }]}
              onPress={saveVideo}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView mode="video" style={styles.camera} ref={cameraRef}>
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
    height: "100%",
  },
  camera: {
    flex: 1,
    height: "100%",
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
    height: 600,
  },
  button: {
    backgroundColor: "#28A745",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
