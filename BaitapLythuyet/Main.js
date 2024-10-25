import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Test from "./Test";
import Home from "./Home";

const Drawer = createDrawerNavigator();
export default function Main() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          options={{ drawerLabel: "Trang Chủ", title: "Trang Chủ" }}
          component={Home}
        />
        <Drawer.Screen
          name="Test"
          options={{ drawerLabel: "Trang Cấu Hình", title: "Cấu Hình" }}
          component={Test}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
