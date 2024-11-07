import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NotificationsScreen from "../screens/NotificationsScreen";
import HelpsScreen from "../screens/HelpsScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home ">
      <Drawer.Screen
        name="Home "
        component={HomeScreen}
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
