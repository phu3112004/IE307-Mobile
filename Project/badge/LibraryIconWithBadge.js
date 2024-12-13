import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function LibraryIconWithBadge({ badgeCount, color, size }) {
  return (
    <View style={{ width: size, height: size }}>
      <Icon name="bookmark" size={size} color={color} />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -1,
    top: -2,
    backgroundColor: "red",
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 8,
    fontWeight: "bold",
  },
});

export default LibraryIconWithBadge;
