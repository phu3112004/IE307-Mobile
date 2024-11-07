import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Notifications Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("NotificationDetailsScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationsScreen;
