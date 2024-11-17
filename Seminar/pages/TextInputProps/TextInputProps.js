import React from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";

export default TextInputProps = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionStyle}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_username.png",
          }}
          style={styles.imageStyle}
        />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter Your Name Here"
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.sectionStyle}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_phone.png",
          }}
          style={styles.imageStyle}
        />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter Your Mobile No Here"
          underlineColorAndroid="transparent"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
});
