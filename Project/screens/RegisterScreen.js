import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else signUp(name, username, password, navigation);
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://images.scalebranding.com/fd3d233c-d92c-4e0c-93b5-cf3b92327c34.png",
        }}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Register</Text>

      <View style={styles.inputContainer}>
        <View style={styles.iconStyleContainer}>
          <Icon
            name="user-circle-o"
            size={24}
            color="#000"
            style={styles.iconStyle}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconStyleContainer}>
          <Icon name="user" size={24} color="#000" style={styles.iconStyle} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconStyleContainer}>
          <Icon name="lock" size={27} color="#000" style={styles.iconStyle} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconStyleContainer}>
          <Icon name="lock" size={27} color="#000" style={styles.iconStyle} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.forgotPassword}>Have an account?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 99,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginVertical: 8,
  },
  iconStyleContainer: {
    marginRight: 10,
    width: 30,
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
  },
  forgotPassword: {
    marginVertical: 10,
    color: "hotpink",
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#cf3339",
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
