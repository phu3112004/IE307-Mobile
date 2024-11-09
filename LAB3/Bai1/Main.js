import React from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./navigations/AppNavigator";

export default function Main() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
