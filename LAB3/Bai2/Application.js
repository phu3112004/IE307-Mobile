import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BotTab from "./navigations/BotTab";
import { SettingsContextProvider } from "./context/SettingsContext";

export default function Application() {
  return (
    <SettingsContextProvider>
      <NavigationContainer>
        <BotTab />
      </NavigationContainer>
    </SettingsContextProvider>
  );
}
