import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import { getAllProducts } from "../helps/helps";
import { ScrollView } from "react-native-gesture-handler";
import ProductList from "../components/ProductList";

export default function HomeScreen({ navigation }) {
  const [newProducts, setNewProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const width = Dimensions.get("window").width;

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setNewProducts(products.filter((product) => product.rating.rate <= 4));
      setHotProducts(products.filter((product) => product.rating.rate > 4));
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const bannerData = [
    {
      uri: "https://templates.simplified.co/thumb/3446e660-7af3-4ff6-86ce-755afcde8fcd.jpg",
    },
    {
      uri: "https://cdn.shopify.com/s/files/1/1115/6326/files/B1004_Diamonds_banner_3_thumb_e01734f7-45ee-4a5d-a2c6-cd722e1f0a23.jpg?v=1511876038",
    },
    {
      uri: "https://i0.wp.com/img.paisawapas.com/ovz3vew9pw/2023/01/30121843/Untitled-1.jpg",
    },
  ];
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
      <Text style={styles.header}>Shopping is cheaper than psychiatrist</Text>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={bannerData}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.itemContainer}>
        <Text style={styles.subHeader}>Hot Deals</Text>
        <ProductList data={hotProducts} navigation={navigation} />

        <Text style={styles.subHeader}>New Arrivals</Text>
        <ProductList data={newProducts} navigation={navigation} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    color: "#cf3339",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  subHeader: {
    fontSize: 22,
    color: "#cf3339",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  itemContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
