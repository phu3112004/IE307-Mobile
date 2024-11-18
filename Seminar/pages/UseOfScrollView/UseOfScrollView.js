import React, { useState, useRef } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";

const UseOfScrollView = () => {
  // Mảng dữ liệu ban đầu
  const [data, setData] = useState([]);
  const scrollViewRef = useRef(); // Tham chiếu đến ScrollView

  // Hàm để thêm item mới vào mảng
  const addItem = () => {
    const newItem = {
      id: data.length + 1, // Tạo id tự động theo số lượng phần tử hiện tại
      title: `Item ${data.length + 1}`, // Tạo title mới
    };

    // Cập nhật mảng và cuộn đến item vừa thêm
    setData((prevData) => {
      const updatedData = [...prevData, newItem];
      // Cuộn đến item vừa thêm (mục cuối cùng trong danh sách)
      setTimeout(() => {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: updatedData.length * 50,
          animated: true,
        });
      }, 100);
      return updatedData;
    });
  };

  return (
    <View style={styles.container}>
      {/* Button để thêm item */}
      <Button title="Add Item" onPress={addItem} />

      {/* ScrollView để hiển thị danh sách các item */}
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>
        {data.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text>
              {item.id}. {item.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    marginTop: 20,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50, // Giới hạn chiều cao của mỗi item
  },
});

export default UseOfScrollView;
