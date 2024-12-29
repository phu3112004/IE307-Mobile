import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { FlatList } from "react-native-gesture-handler";
import {
  getCart,
  deleteFromCart,
  updateQuantity,
  clearCart,
} from "../database/db";

export default function CartScreen({ navigation }) {
  const { userToken, countCart, updateCountCart } = useContext(AuthContext);
  const user = userToken !== "" ? jwtDecode(userToken) : null;
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const cartInfo = await getCart(user.sub);
      setCart(cartInfo);
      setLoading(false);
    };

    fetchCart();
  }, [countCart]);

  const handleIncreaseQuantity = async (index, productId) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    await updateQuantity(user.sub, productId, updatedCart[index].quantity);
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = async (index, productId) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      await updateQuantity(user.sub, productId, updatedCart[index].quantity);
      setCart(updatedCart);
    } else {
      setSelectedProductId(productId);
      setModalVisible(true);
    }
  };

  const handleRemoveProduct = async () => {
    setLoading(true);
    await deleteFromCart(user.sub, selectedProductId);
    updateCountCart(countCart - 1 > 0 ? countCart - 1 : 0);
    setCart(cart.filter((item) => item.productId !== selectedProductId));
    setModalVisible(false);
    setLoading(false);
  };

  const handleCheckout = async () => {
    setLoading(true);
    await clearCart(user.sub);
    updateCountCart(0);
    setCart([]);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
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
            keyExtractor={(item) => item.productId.toString()}
            contentContainerStyle={{ paddingBottom: 50 }}
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
                        onPress={() =>
                          handleDecreaseQuantity(index, product.productId)
                        }
                      >
                        <Text style={styles.buttonText}>－</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{product.quantity}</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                          handleIncreaseQuantity(index, product.productId)
                        }
                      >
                        <Text style={styles.buttonText}>＋</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.productTotalContainer}>
                    <Text style={styles.totalPrice}>Total:</Text>
                    <Text style={styles.totalPrice}>
                      ${(product.price * product.quantity).toFixed(2)}
                    </Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => {
                        setSelectedProductId(product.productId);
                        setModalVisible(true);
                      }}
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
              {cart
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
            </Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>
            You have no products in your cart.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#cf3339",
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              SHOPPING NOW
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to remove this item?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonYes}
                onPress={handleRemoveProduct}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonNo}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButtonYes: {
    backgroundColor: "#cf3339",
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 5,
  },
  modalButtonNo: {
    backgroundColor: "#9491b5",
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
