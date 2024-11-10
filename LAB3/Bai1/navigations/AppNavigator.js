import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainTab from "./MainTab";
import AuthStack from "./AuthStack";
import HomeDetailsScreen from "../screens/HomeDetailsScreen";
import NotificationDetailsScreen from "../screens/NotificationDetailsScreen";
import HomeDrawerNavigator from "./HomeDrawerNavigator";

const Stack = createStackNavigator();
const AppNavigator = () => {
  const { userToken } = useContext(AuthContext);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthStack">
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeDetails"
            component={HomeDetailsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="NotificationDetailsScreen"
            component={NotificationDetailsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="HomeDrawers"
            component={HomeDrawerNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
