import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BotTab from "./navigations/BotTab";
import AddNoteScreen from "./screens/AddNoteScreen";
import { SettingsContextProvider } from "./context/SettingsContext";
const Stack = createStackNavigator();

export default function Application() {
  return (
    <SettingsContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BotTab"
            component={BotTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AddNote" component={AddNoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsContextProvider>
  );
}
