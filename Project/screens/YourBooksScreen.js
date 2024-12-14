import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RecentScreen from "./yourbooks/RecentScreen";
import LibraryScreen from "./yourbooks/LibraryScreen";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const BookTab = createMaterialTopTabNavigator();

export default function BookScreen() {
  const { themeColor } = useContext(ThemeContext);

  return (
    <BookTab.Navigator initialRouteName="Library">
      <BookTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarActiveTintColor: themeColor.color,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: themeColor.backgroundColor,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#cf3339", // Màu thanh trượt khi tab được chọn
            height: 3,
          },
        }}
      />
      <BookTab.Screen
        name="Recent"
        component={RecentScreen}
        options={{
          tabBarActiveTintColor: themeColor.color,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: themeColor.backgroundColor,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#cf3339", // Màu thanh trượt khi tab được chọn
            height: 3,
          },
        }}
      />
    </BookTab.Navigator>
  );
}
