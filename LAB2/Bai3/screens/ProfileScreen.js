import { View, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
  const { logOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="LOG OUT" onPress={logOut} />
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
