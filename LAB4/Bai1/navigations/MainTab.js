import React, { useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../screens/CartScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import CartIconWithBadge from "../badge/CartIconWithBadge";
import HomeStack from "./HomeStack";
import CategoryStack from "./CategoryStack";
import ProfileStack from "./ProfileStack";
import { AuthContext } from "../context/AuthContext";

const Tab = createBottomTabNavigator();
export default function MainTab({ navigation }) {
  const { userToken } = useContext(AuthContext);
  useEffect(() => {
    if (userToken === "") {
      navigation.navigate("Login");
    }
  }, [userToken]);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Categories") {
            iconName = "list";
          } else if (route.name === "Cart") {
            return <CartIconWithBadge color={color} size={size} />;
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
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
