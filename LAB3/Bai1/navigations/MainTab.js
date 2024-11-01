import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryScreen from "../screens/CategoryScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import FavoriteIconWithBadge from "../badge/FavoriteIconWithBadge";
import HomeDrawerNavigator from "./HomeDrawerNavigator";

const Tab = createBottomTabNavigator();
export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Categories") {
            iconName = "list";
          } else if (route.name === "Favorites") {
            return (
              <FavoriteIconWithBadge badgeCount={3} color={color} size={size} />
            );
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeDrawerNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Categories" component={CategoryScreen} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
