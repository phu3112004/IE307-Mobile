import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/HomeScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import HelpsScreen from "../screens/HelpsScreen";
import Icon from "react-native-vector-icons/FontAwesome";

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="home" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="bell" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Helps"
        component={HelpsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="question" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawerNavigator;
