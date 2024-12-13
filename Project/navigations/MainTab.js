  import React, { useEffect, useState } from "react";
  import { BackHandler, ToastAndroid } from "react-native";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import HomeScreen from "../screens/HomeScreen";
  import LibraryScreen from "../screens/LibraryScreen";
  import SearchScreen from "../screens/SearchScreen";
  import ProfileScreen from "../screens/ProfileScreen";
  import Icon from "react-native-vector-icons/FontAwesome";
  import LibraryIconWithBadge from "../badge/LibraryIconWithBadge";

  const Tab = createBottomTabNavigator();

  export default function MainTab() {
    const [backPressedOnce, setBackPressedOnce] = useState(false);

    useEffect(() => {
      const backAction = () => {
        if (backPressedOnce) {
          BackHandler.exitApp(); // Thoát ứng dụng nếu nhấn lần thứ hai
        } else {
          setBackPressedOnce(true); // Đánh dấu nhấn lần đầu
          ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT); // Hiển thị thông báo
          setTimeout(() => setBackPressedOnce(false), 2000); // Reset trạng thái sau 2 giây
        }
        return true; // Ngăn hành vi quay lại mặc định
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove(); // Gỡ listener khi component bị unmount
    }, [backPressedOnce]);

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Search") {
              iconName = "search";
            } else if (route.name === "Library") {
              return (
                <LibraryIconWithBadge badgeCount={3} color={color} size={size} />
              );
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#cf3339",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }
