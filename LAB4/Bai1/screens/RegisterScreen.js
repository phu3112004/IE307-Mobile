import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://yt3.googleusercontent.com/fCqO8VecoZZY2AKnmvTzFVRlxL44QAd1oIu6wJIFYVtG7VFfv9XpiOL5WkMzE0SlCMaH0Hh_fA=s900-c-k-c0x00ffffff-no-rj",
        }}
        style={styles.logo}
      />

      <Text style={styles.welcomeText}>Create New Account</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconStyleContainer}>
          <Icon name="user" size={28} color="#000" style={styles.iconStyle} />
        </View>
        <TextInput style={styles.input} placeholder="Username" />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconStyleContainer}>
          <Icon
            name="envelope"
            size={24}
            color="#000"
            style={styles.iconStyle}
          />
        </View>
        <TextInput style={styles.input} placeholder="Email" />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconStyleContainer}>
          <Icon name="lock" size={27} color="#000" style={styles.iconStyle} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
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
        />
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          Alert.alert("Create new account feature is not available yet");
        }}
      >
        <Text style={styles.loginButtonText}>CREATE</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Already have an account?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Log in now!
        </Text>
      </Text>
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
    width: 100,
    height: 100,
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
    alignItems: "flex-end",
    width: "100%",
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
  orText: {
    marginVertical: 10,
    color: "#000",
    fontWeight: "bold",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
    marginVertical: 10,
  },
  socialIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 16,
  },
  signupText: {
    marginTop: 20,
    color: "#777",
  },
  signupLink: {
    color: "#cf3339",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
