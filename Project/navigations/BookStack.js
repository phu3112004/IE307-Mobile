import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookDetail from "../component/BooksScreen/BookDetail";
import BookContent from "../component/BooksScreen/BookContent";
import MainTab from "./MainTab";

const BStack = createStackNavigator();

const BookStack = () => {
  return (
    <BStack.Navigator>
      {/* MainTab không hiển thị header */}
      <BStack.Screen
        name="MainTab"
        component={MainTab}
        options={{
          headerShown: false, // Ẩn toàn bộ header, bao gồm nút quay lại
        }}
      />
      {/* BookDetail hiển thị header */}
      <BStack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{
          title: "Book Detail", // Tiêu đề của màn hình BookDetail
        }}
      />
      {/* BookContent hiển thị header */}
      <BStack.Screen
        name="BookContent"
        component={BookContent}
        options={{
          title: "Book Content", // Tiêu đề của màn hình BookContent
        }}
      />
    </BStack.Navigator>
  );
};

export default BookStack;
