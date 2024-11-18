import React, { useState, useRef } from "react";
import {
  FlatList,
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

const ListViewProps = () => {
  const [data, setData] = useState([
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState("");

  const flatListRef = useRef(null);

  // Handle refresh (pull-to-refresh)
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Simulate data fetching
      setData([{ id: "0", name: "New Item" }, ...data]);
      setRefreshing(false);
    }, 1500);
  };

  // Handle load more (pagination)
  const loadMoreData = () => {
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        // Simulate loading more data
        const moreData = [
          { id: `${data.length + 1}`, name: `Item ${data.length + 1}` },
          { id: `${data.length + 2}`, name: `Item ${data.length + 2}` },
        ];
        setData([...data, ...moreData]);
        setIsLoading(false);
      }, 2000);
    }
  };

  // Handle search filter
  const handleSearch = (text) => {
    setFilterText(text);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Scroll to top or bottom
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  // Render header and footer
  const renderHeader = () => <Text style={styles.header}>Danh sách đầu</Text>;
  const renderFooter = () =>
    isLoading ? (
      <Text style={styles.footer}>Đang tải thêm...</Text>
    ) : (
      <Text style={styles.footer}>Hết dữ liệu</Text>
    );

  // Render empty component
  const renderEmpty = () => (
    <Text style={styles.emptyMessage}>Danh sách hiện đang trống</Text>
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm..."
        value={filterText}
        onChangeText={handleSearch}
      />

      {/* FlatList */}
      <FlatList
        ref={flatListRef}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
      />

      {/* Buttons for scroll control */}
      <View style={styles.buttonContainer}>
        <Button title="Cuộn lên đầu" onPress={scrollToTop} />
        <Button title="Cuộn xuống cuối" onPress={scrollToBottom} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    padding: 10,
    color: "#999",
  },
  emptyMessage: {
    textAlign: "center",
    padding: 20,
    color: "#999",
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default ListViewProps;
