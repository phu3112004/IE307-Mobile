import React from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Categories1Screen from "./Categories1Screen";
import Categories2Screen from "./Categories2Screen";
import Categories3Screen from "./Categories3Screen";

const Tab = createMaterialTopTabNavigator();

export default function CategoryScreen() {
  return (
    <View style={styles.container}>
      <Tab.Navigator initialRouteName="Categories1">
        <Tab.Screen name="Categories1" component={Categories1Screen} />
        <Tab.Screen name="Categories2" component={Categories2Screen} />
        <Tab.Screen name="Categories3" component={Categories3Screen} />
      </Tab.Navigator>
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
