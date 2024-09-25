import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

export default function Register() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={[styles.corner, styles.cornerTL]} />
      <View style={[styles.corner, styles.cornerTR]} />
      <View style={[styles.corner, styles.cornerBL]} />
      <View style={[styles.corner, styles.cornerBR]} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="Full Name"
          />
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="Username"
          />
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TextInput
            placeholderTextColor="white"
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableHighlight style={styles.button} underlayColor="gray">
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 64,
    borderColor: "#127e9c",
    borderWidth: 16,
    borderStyle: "solid",
  },
  title: {
    fontSize: 35,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "#2fbce7",
    paddingHorizontal: 8,
    fontSize: 14,
    color: "#fff",
    marginVertical: 15,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  corner1: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "red",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  corner: {
    position: "absolute",
    width: 0,
    height: 0,
    zIndex: 2,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderRightWidth: 80,
    borderRightColor: "transparent",
    borderTopWidth: 80,
    borderTopColor: "#2fbce7",
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderLeftWidth: 80,
    borderLeftColor: "transparent",
    borderTopWidth: 80,
    borderTopColor: "#2fbce7",
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderRightWidth: 80,
    borderRightColor: "transparent",
    borderBottomWidth: 80,
    borderBottomColor: "#2fbce7",
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 80,
    borderLeftColor: "transparent",
    borderBottomWidth: 80,
    borderBottomColor: "#2fbce7",
  },
});
