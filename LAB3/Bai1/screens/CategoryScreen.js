import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Categories1Screen from "./Categories1Screen";
import Categories2Screen from "./Categories2Screen";
import Categories3Screen from "./Categories3Screen";

const Tab = createMaterialTopTabNavigator();

export default function CategoryScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Categories1"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14, // Đảm bảo kích thước của nhãn đủ lớn
          fontWeight: "bold", // Đảm bảo có độ đậm cho nhãn
        },
        tabBarIndicatorStyle: {
          backgroundColor: "blue", // Tùy chỉnh chỉ báo nếu cần
        },
      }}
    >
      <Tab.Screen name="Categories1" component={Categories1Screen} />
      <Tab.Screen name="Categories2" component={Categories2Screen} />
      <Tab.Screen name="Categories3" component={Categories3Screen} />
    </Tab.Navigator>
  );
}
