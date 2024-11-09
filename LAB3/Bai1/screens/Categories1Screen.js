import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default function Categories1Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
