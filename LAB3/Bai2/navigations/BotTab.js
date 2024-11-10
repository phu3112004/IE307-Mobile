import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingScreen from "../screens/SettingScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { ThemeContext } from "../context/SettingsContext";
import HomeStack from "./HomeStack";
const Tab = createBottomTabNavigator();

export default function Application() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeStack") {
            iconName = "home";
          } else if (route.name === "Settings") {
            iconName = "gear";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0297f9",
        tabBarInactiveTintColor: isDarkMode ? "white" : "gray",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "black" : "white",
        },
      })}
      initialRouteName="HomeStack"
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerStyle: { backgroundColor: isDarkMode ? "black" : "white" },
          headerTitleStyle: {
            color: isDarkMode ? "white" : "black",
          },
        }}
      />
    </Tab.Navigator>
  );
}
