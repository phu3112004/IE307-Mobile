import React, { useEffect, useState, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import YourBooksScreen from "../screens/YourBooksScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import LibraryIconWithBadge from "../badge/LibraryIconWithBadge";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const { userToken } = useContext(AuthContext); // Lấy thông tin người dùng từ context
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Your Books") {
            const badgeCount = userToken?.books?.length || 0; // Đếm số lượng sách trong books
            return (
              <LibraryIconWithBadge badgeCount={badgeCount} color={color} size={size} />
            );
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#cf3339",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        name="Your Books"
        component={YourBooksScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
