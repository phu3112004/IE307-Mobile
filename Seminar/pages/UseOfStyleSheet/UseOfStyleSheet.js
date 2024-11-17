import React, { useState } from "react";
//import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const UseOfStyleSheet = () => {
  const [showSquare, setShowSquare] = useState(true);
  const [showCircle, setShowCircle] = useState(false);
  const [showTriangle, setShowTriangle] = useState(false);
  const [showRectangle, setShowRectangle] = useState(false);
  const [showOval, setShowOval] = useState(false);

  const changeShape = (shape) => {
    setShowSquare(shape == "Square");
    setShowCircle(shape == "Circle");
    setShowTriangle(shape == "Triangle");
    setShowRectangle(shape == "Rectangle");
    setShowOval(shape == "Oval");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.containerMain}>
        <View
          style={
            showSquare
              ? styles.SquareShapeView
              : showCircle
              ? styles.CircleShapeView
              : showRectangle
              ? styles.RectangleShapeView
              : showTriangle
              ? styles.TriangleShapeView
              : showOval
              ? styles.OvalShapeView
              : ""
          }
        />
        <TouchableOpacity onPress={() => changeShape("Square")} active={0.8}>
          <Text style={{ marginTop: 20, fontSize: 20 }}>Square</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeShape("Circle")} active={0.8}>
          <Text style={{ marginTop: 20, fontSize: 20 }}>Circle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeShape("Triangle")} active={0.8}>
          <Text style={{ marginTop: 20, fontSize: 20 }}>Triangle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeShape("Rectangle")} active={0.8}>
          <Text style={{ marginTop: 20, fontSize: 20 }}>Rectangle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeShape("Oval")} active={0.8}>
          <Text style={{ marginTop: 20, fontSize: 20 }}>Oval</Text>
        </TouchableOpacity>
        <View style={styles.bottomView}>
          <Text style={styles.textStyle}>Bottom View</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    width: "100%",
    height: 50,
    backgroundColor: "#EE5407",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  textStyle: {
    color: "#fff",
    fontSize: 18,
  },
  CircleShapeView: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#FF00FF",
  },
  OvalShapeView: {
    //To make Oval Shape
    marginTop: 20,
    width: 100,
    height: 100,
    backgroundColor: "#ED2525",
    borderRadius: 50,
    transform: [{ scaleX: 2 }],
  },
  SquareShapeView: {
    //To make Square Shape
    width: 100,
    height: 100,
    backgroundColor: "#14ff5f",
  },
  RectangleShapeView: {
    //To make Rectangle Shape
    marginTop: 20,
    width: 120 * 2,
    height: 120,
    backgroundColor: "#14ff5f",
  },
  TriangleShapeView: {
    //To make Triangle Shape
    width: 0,
    height: 0,
    borderLeftWidth: 60,
    borderRightWidth: 60,
    borderBottomWidth: 120,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#606070",
  },
});
export default UseOfStyleSheet;
