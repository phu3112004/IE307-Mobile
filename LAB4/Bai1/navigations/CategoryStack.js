import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CategoryTab from "./CategoryTab";
import DetailScreen from "../screens/DetailScreen";

const Stack = createStackNavigator();

export default function CategoryStack() {
  return (
    <Stack.Navigator initialRouteName="Category">
      <Stack.Screen
        name="Categories"
        component={CategoryTab}
        options={{ headerLeft: null }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
