import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ViewProps() {
  return (
    <View style={styles.container}>
      <View
        style={styles.innerView}
        onStartShouldSetResponder={() => alert("View Clicked")}
      >
        <Text style={styles.paragraph}>Example of Click on a View</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 25,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  innerView: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 25,
    backgroundColor: "#808080",
    marginTop: 200,
    marginBottom: 200,
    marginLeft: 20,
    marginRight: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
