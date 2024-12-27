import { View, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function ProfileScreen() {
  const { logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut();
  };
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="LOG OUT" onPress={handleLogout} />
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
