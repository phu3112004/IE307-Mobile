import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { ThemeContext } from "../context/SettingsContext";
const Tab = createBottomTabNavigator();

export default function Application() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
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
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
