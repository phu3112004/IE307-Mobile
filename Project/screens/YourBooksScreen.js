import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RecentScreen from "./yourbooks/RecentScreen";
import LibraryScreen from "./yourbooks/LibraryScreen";

const BookTab = createMaterialTopTabNavigator();

export default function BookScreen() {
  return (
      <BookTab.Navigator>
        <BookTab.Screen name="Recent" component={RecentScreen} />
        <BookTab.Screen name="Library" component={LibraryScreen} />
      </BookTab.Navigator>
  );
}
