import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlaceStack from "./navigations/PlaceStack";
import MediaStack from "./navigations/MediaStack";
import Icon from "react-native-vector-icons/MaterialIcons";

const BottomTab = createBottomTabNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName="Place"
        screenOptions={({ route }) => ({
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "#cf3339",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Place") {
              iconName = "location-pin";
            } else if (route.name === "Media") {
              iconName = "perm-media";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <BottomTab.Screen
          name="Place"
          component={PlaceStack}
          options={{ headerShown: false }}
        />
        <BottomTab.Screen
          name="Media"
          component={MediaStack}
          options={{ headerShown: false }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
