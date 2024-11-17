import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function TextProps() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        Example of{" "}
        <Text style={styles.strikeThroughtextStyle}>Strike through</Text> Text
      </Text>
      <Text style={styles.textStyle}>
        Example of <Text style={styles.underlineTextStyle}>Underline Text</Text>
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 20, lineHeight: 30 }}>Example of</Text>
        <Text style={{ fontSize: 15, lineHeight: 18 }}>Superscript</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 20, lineHeight: 30 }}>Example of</Text>
        <Text style={{ fontSize: 15, lineHeight: 40 }}>Subscript</Text>
      </View>

      <Text style={styles.paragraph}>
        Example of
        {"\n"}
        multiline text
      </Text>
      <Text style={styles.paragraph}>
        {`Here is an other way to set
         multiline text.`}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
  },
  strikeThroughtextStyle: {
    textDecorationLine: "line-through",
  },
  underlineTextStyle: {
    textDecorationLine: "underline",
  },
  paragraph: {
    margin: 20,
    fontSize: 18,
    textAlign: "center",
  },
});
