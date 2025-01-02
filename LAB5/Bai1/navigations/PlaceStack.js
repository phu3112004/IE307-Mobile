import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListPlaceScreen from "../screens/Places/ListPlaceScreen";
import AddPlaceScreen from "../screens/Places/AddPlaceScreen";
import MapScreen from "../screens/Places/MapScreen";
import DetailPlaceScreen from "../screens/Places/DetailPlaceScreen";
import DetailMapScreen from "../screens/Places/DetailMapScreen";

const Stack = createStackNavigator();

export default function PlaceStack() {
  return (
    <Stack.Navigator initialRouteName="Places">
      <Stack.Screen
        name="Places"
        component={ListPlaceScreen}
        options={{ title: "My Places" }}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlaceScreen}
        options={{ title: "Add a new place" }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Map" }}
      />
      <Stack.Screen
        name="DetailPlace"
        component={DetailPlaceScreen}
        options={{ title: "Detail Place" }}
      />
      <Stack.Screen
        name="DetailMap"
        component={DetailMapScreen}
        options={{ title: "Map" }}
      />
    </Stack.Navigator>
  );
}
