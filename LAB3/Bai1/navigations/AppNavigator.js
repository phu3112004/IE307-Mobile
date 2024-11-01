import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./MainTab";
import AuthStack from "./AuthStack";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeDetailsScreen from "../screens/HomeDetailsScreen";

const Stack = createStackNavigator();
const AppNavigator = () => {
  const { userToken } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
