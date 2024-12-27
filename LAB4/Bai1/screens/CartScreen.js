import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { getCartByUser, getProductById } from "../helps/helps";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { FlatList } from "react-native-gesture-handler";

export default function CartScreen() {
  const { userToken } = useContext(AuthContext);
  const user = jwtDecode(userToken);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const cartInfo = await getCartByUser(user.sub);
      const productId = cartInfo[0].products.map(
        (product) => product.productId
      );
      const productDetail = await Promise.all(
        productId.map((id) => getProductById(id))
      );
      const updatedCart = cartInfo[0].products.map((product, index) => ({
        ...product,
        ...productDetail[index],
      }));
      setCart(updatedCart);
      setLoading(false);
    };

    fetchCart();
  }, [userToken]);

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#cf3339" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: product, index }) => (
              <View style={styles.product}>
                <View style={styles.productTitleContainer}>
                  <Text style={styles.productTitle}>{product.title}</Text>
                </View>
                <View style={styles.productDetailsContainer}>
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImage}
                    />
                  </View>
                  <View style={styles.productInfoContainer}>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleDecreaseQuantity(index)}
                      >
                        <Text style={styles.buttonText}>－</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{product.quantity}</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleIncreaseQuantity(index)}
                      >
                        <Text style={styles.buttonText}>＋</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.productTotalContainer}>
                    <Text style={styles.totalPrice}>Total:</Text>
                    <Text style={styles.totalPrice}>
                      ${product.price * product.quantity}
                    </Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveProduct(index)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Total Amount: $
              {cart.reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )}
            </Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>You have no products in your cart.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  product: {
    padding: 15,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productTitleContainer: {
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productImageContainer: {
    flex: 1,
    marginRight: 15,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  productInfoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  productPrice: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
  quantity: {
    marginHorizontal: 5,
    fontSize: 16,
  },
  productTotalContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: "#cf3339",
    padding: 8,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 15,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#cf3339",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
