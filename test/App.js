import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Network } from 'expo-network';

export default function App() {
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const ip = await Network.getIpAddressAsync();
        console.log("Device IP:", ip); // In ra IP để kiểm tra
      } catch (error) {
        console.error("Lỗi khi lấy IP:", error);
      }
    };
    
    fetchIp();
  }, []);

  return (
    <View>
      <Text>Check console for IP address</Text>
    </View>
  );
}
