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
      <Drawer.Screen name="TextProps" component={TextProps} />
      <Drawer.Screen name="TextInputProps" component={TextInputProps} />
      <Drawer.Screen name="ButtonProps" component={ButtonProps} />
      <Drawer.Screen name="ImageProps" component={ImageProps} />
      <Drawer.Screen
        name="ListViewProps"
        component={() => <ScreenComponent title="ListView Props" />}
      />
      <Drawer.Screen
        name="ScrollViewProps"
        component={() => <ScreenComponent title="ScrollView Props" />}
      />
      <Drawer.Screen
        name="WebViewProps"
        component={() => <ScreenComponent title="WebView Props" />}
      />
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
