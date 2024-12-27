import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AllScreen from "../screens/CategoryScreen/AllScreen";
import ElectronicScreen from "../screens/CategoryScreen/ElectronicScreen";
import JewelryScreen from "../screens/CategoryScreen/JewelryScreen";
import MenClothScreen from "../screens/CategoryScreen/MenClothScreen";

const Tab = createMaterialTopTabNavigator();

export default function CategoryTab() {
  return (
    <Tab.Navigator
      initialRouteName="All"
      screenOptions={{
        tabBarShowIcon: true,
        tabBarIndicatorStyle: { backgroundColor: "#cf3339" },
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarLabelStyle: { fontSize: 9 },
      }}
    >
      <Tab.Screen
        name="All"
        component={AllScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="apps-outline" size={20} color={color} />
          ),
          title: "All",
        }}
      />
      <Tab.Screen
        name="Electronic"
        component={ElectronicScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="desktop-outline" size={20} color={color} />
          ),
          title: "Electronics",
        }}
      />
      <Tab.Screen
        name="Jewelry"
        component={JewelryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="diamond-outline" size={20} color={color} />
          ),
          title: "Jewelry",
        }}
      />
      <Tab.Screen
        name="MenCloth"
        component={MenClothScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="shirt-outline" size={20} color={color} />
          ),
          title: "Men's Clothes",
        }}
      />
    </Tab.Navigator>
  );
}
