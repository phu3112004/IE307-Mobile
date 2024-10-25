import { View, Text } from "react-native";
import React from "react";
import Register from "./Register";
import Login from "./Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
export default function Test() {
  return (
    <Tab.Navigator
      initialRouteName="Register"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#42f44b" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Login") {
            iconName = focused ? "account-circle" : "account-circle-outline";
          } else if (route.name === "Register") {
            iconName = focused
              ? "account-cowboy-hat"
              : "account-cowboy-hat-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Register" component={Register} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}
