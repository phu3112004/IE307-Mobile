import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ProgressBarAndroid,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";

const WebViewProps = () => {
  const [progress, setProgress] = useState(0); // State để theo dõi tiến độ tải trang

  // Hàm cập nhật tiến độ tải
  const onLoadProgress = (event) => {
    setProgress(event.nativeEvent.progress); // Cập nhật progress từ sự kiện
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Loading...</Text>

      {/* Hiển thị Progress Bar */}
      {Platform.OS === "android" ? (
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progress}
          style={styles.progressBar}
        />
      ) : (
        <View style={styles.iosProgressBar}>
          <Text>
            iOS progress bar will be custom (or you can use third-party
            libraries for iOS progress)
          </Text>
        </View>
      )}

      {/* WebView để load URL hoặc file HTML */}
      <WebView
        source={{ uri: "https://www.facebook.com" }}
        style={{ marginTop: 20 }}
        onLoadProgress={onLoadProgress} // Theo dõi tiến độ tải
        onLoadEnd={() => setProgress(1)} // Khi tải xong, đặt progress = 1 (100%)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },
  progressBar: {
    margin: 10,
  },
  iosProgressBar: {
    margin: 10,
    backgroundColor: "#ddd",
    height: 20,
  },
});

export default WebViewProps;
