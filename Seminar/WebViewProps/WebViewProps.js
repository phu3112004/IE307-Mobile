import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewProps = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadProgress = ({ nativeEvent }) => {
    setLoadingProgress(nativeEvent.progress);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>
            Đang tải... {Math.round(loadingProgress * 100)}%
          </Text>
        </View>
      )}
      <WebView
        source={{ uri: 'https://givenow.vn' }} // Thay bằng file cục bộ nếu cần
        onLoadProgress={handleLoadProgress}
        onLoadEnd={handleLoadEnd}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.😎', // Hiệu ứng mờ nền khi tải
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default WebViewProps;