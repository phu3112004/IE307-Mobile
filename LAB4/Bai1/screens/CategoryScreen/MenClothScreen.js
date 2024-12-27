import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { getProductsByCategory } from "../../helps/helps";
import { ScrollView } from "react-native-gesture-handler";
import ProductList from "../../components/ProductList";

export default function MenClothScreen({ navigation }) {
  const [products, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsByCategory("men's clothing");
      setNewProducts(products);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#cf3339" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemContainer}>
        <ProductList data={products} navigation={navigation} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
