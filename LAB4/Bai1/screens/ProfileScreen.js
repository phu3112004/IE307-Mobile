import { View, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
export default function ProfileScreen() {
  const { logOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLogout = () => {
    logOut();
    navigation.replace("Login");
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
