import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MediaLibraryScreen from "../screens/Media/MediaLibraryScreen";
import RecordVideoScreen from "../screens/Media/RecordVideoScreen";

const Stack = createStackNavigator();

export default function MediaStack() {
  return (
    <Stack.Navigator initialRouteName="MediaLibrary">
      <Stack.Screen
        name="MediaLibrary"
        component={MediaLibraryScreen}
        options={{ title: "Media Library" }}
      />
      <Stack.Screen
        name="RecordVideo"
        component={RecordVideoScreen}
        options={{ title: "Record Video" }}
      />
    </Stack.Navigator>
  );
}
