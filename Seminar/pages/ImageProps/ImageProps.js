//Make Circular Image in React Native using Border Radius
//https://aboutreact.com/react-native-round-shape-image/

//import React in our code
import React from "react";

//import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Image, Text } from "react-native";

const ImageProps = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
          }}
          //borderRadius will help to make Round Shape
          style={{
            width: 200,
            height: 200,
            borderRadius: 200 / 2,
          }}
        />
        <Text style={styles.textHeadingStyle}>About React</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0dcdc",
  },
  textHeadingStyle: {
    marginTop: 30,
    fontSize: 40,
    color: "#0250a3",
    fontWeight: "bold",
  },
});

export default ImageProps;
