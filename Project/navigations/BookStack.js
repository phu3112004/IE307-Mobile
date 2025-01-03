import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookDetail from "../component/BooksScreen/BookDetail";
import BookContent from "../component/BooksScreen/BookContent";
import MainTab from "./MainTab";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const BStack = createStackNavigator();

const BookStack = () => {
  const { themeColor } = useContext(ThemeContext);
  return (
    <BStack.Navigator>
      {/* MainTab không hiển thị header */}
      <BStack.Screen
        name="MainTab"
        component={MainTab}
        options={{
          headerShown: false, // Ẩn toàn bộ header, bao gồm nút quay lại, tiêu đề
        }}
      />
      {/* BookDetail hiển thị header */}
      <BStack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{
          title: "Book Detail",
          headerStyle: {
            backgroundColor: themeColor.backgroundColor,
          },
          headerTintColor: themeColor.color,
        }}
      />
      {/* BookContent hiển thị header */}
      <BStack.Screen
        name="BookContent"
        component={BookContent}
        options={{
          title: "Book Content", // Tiêu đề của màn hình BookContent
          headerStyle: {
            backgroundColor: themeColor.backgroundColor,
          },
          headerTintColor: themeColor.color,
        }}
      />
    </BStack.Navigator>
  );
};

export default BookStack;
