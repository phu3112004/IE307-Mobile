import { View, Text } from "react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Reaction({
  onClick,
  isClicked = false,
  type = "Like",
  icon = "thumbs-up",
}) {
  return (
    <TouchableOpacity style={styles.reactionButton} onPress={onClick}>
      <View style={styles.reactionButtonContainer}>
        <Icon
          style={[styles.reactionIcon, { color: isClicked ? "red" : "black" }]}
          name={icon}
          size={20}
        />
        <Text
          style={[styles.reactionText, { color: isClicked ? "red" : "black" }]}
        >
          {type}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reactionButton: {},
  reactionButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reactionIcon: {
    marginRight: 4,
  },
  reactionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
