import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signup from "./Signup";
import Nav from "./Nav";
import NotiDetail from "./Navigator/Drawer-Nav/NotiDetail";
import HomeDetail from "./Navigator/Drawer-Nav/HomeDetail";

const Stack = createStackNavigator();

export default function App1() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Nav"
          component={Nav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationsDetailsScreen"
          component={NotiDetail}
        />
        <Stack.Screen name="HomeDetails" component={HomeDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
