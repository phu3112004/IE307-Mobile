import { Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

export default function Count({ count, type }) {
  return (
    <Text style={styles.reactionCountText}>
      {count === 1 || count === 0
        ? count + " " + type
        : count + " " + type + "s"}
    </Text>
  );
}

const styles = StyleSheet.create({
  reactionCountText: {
    color: "#c2c2c2",
  },
});
