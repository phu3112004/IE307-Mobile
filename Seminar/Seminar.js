import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import ViewProps from "./pages/ViewProps/ViewProps";
import UseOfStyleSheet from "./pages/UseOfStyleSheet/UseOfStyleSheet";
import TextProps from "./pages/TextProps/TextProps";
import TextInputProps from "./pages/TextInputProps/TextInputProps";
import ButtonProps from "./pages/ButtonProps/ButtonProps";
import ImageProps from "./pages/ImageProps/ImageProps";
import ListViewProps from "./pages/ListViewProps/ListViewProps";
import UseOfScrollView from "./pages/UseOfScrollView/UseOfScrollView";
import WebViewProps from "./WebViewProps/WebViewProps";

const Drawer = createDrawerNavigator();

ScreenComponent = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default Seminar = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="ViewProps">
      <Drawer.Screen name="ViewProps" component={ViewProps} />
      <Drawer.Screen name="Use of StyleSheet" component={UseOfStyleSheet} />
      <Drawer.Screen name="Use of Text" component={TextProps} />
      <Drawer.Screen name="TextInputProps" component={TextInputProps} />
      <Drawer.Screen name="ButtonProps" component={ButtonProps} />
      <Drawer.Screen name="ImageProps" component={ImageProps} />
      <Drawer.Screen name="ListViewProps" component={ListViewProps} />
      <Drawer.Screen name="Use of ScrollView" component={UseOfScrollView} />
      <Drawer.Screen name="WebViewProps" component={WebViewProps} />
    </Drawer.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
