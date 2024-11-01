import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import HomeDetailsScreen from "../screens/HomeDetailsScreen";
const Stack = createStackNavigator();
export default function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="HomeDetails"
        component={HomeDetailsScreen}
        options={{
          title: "Home Details",
        }}
      />
    </Stack.Navigator>
  );
}
