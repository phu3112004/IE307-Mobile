import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddNoteScreen from "../screens/AddNoteScreen";
import EditNoteScreen from "../screens/EditNoteScreen";
import { ThemeContext } from "../context/SettingsContext";

const Stack = createNativeStackNavigator();
export default function HomeStack() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{
          headerStyle: {
            backgroundColor: isDarkMode ? "black" : "white",
          },
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNoteScreen}
        options={{
          headerStyle: {
            backgroundColor: isDarkMode ? "black" : "white",
          },
          headerTintColor: isDarkMode ? "white" : "black",
        }}
      />
    </Stack.Navigator>
  );
}
