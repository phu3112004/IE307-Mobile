import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { useState } from "react";
export default function Cal() {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("0");
  const [temp, setTemp] = useState("0");
  const handleInput = (string) => {
    if (result !== "0") {
      setInput(temp + string);
      setTemp(temp + string);
    } else if (input === "0") setInput(string);
    else setInput(input + string);
  };
  const handleClearInput = () => {
    setInput("0");
    setTemp("0");
    setResult("0");
  };
  const handleDeleteInput = () => {
    if (input.length < 2) {
      setInput("0");
      setTemp("0");
    } else {
      setInput(input.slice(0, -1));
      setTemp(input.slice(0, -1));
    }
  };
  const handleCalculate = () => {
    let result = eval(input).toString();
    setResult(result);
    setTemp(result);
    setInput(input);
  };
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.input}>{input}</Text>
        <Text style={styles.input}>={result}</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.dong}>
          <TouchableHighlight underlayColor="gray" style={styles.cot}>
            <Text style={[styles.text, styles.red]} onPress={handleClearInput}>
              AC
            </Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="gray" style={styles.cot}>
            <Text style={[styles.text, styles.red]} onPress={handleDeleteInput}>
              CE
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("%")}
          >
            <Text style={[styles.text, styles.orange]}>%</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("/")}
          >
            <Text style={[styles.text, styles.orange]}>/</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.dong}>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("7")}
          >
            <Text style={styles.text}>7</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("8")}
          >
            <Text style={styles.text}>8</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("9")}
          >
            <Text style={styles.text}>9</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("*")}
          >
            <Text style={[styles.text, styles.orange]}>x</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.dong}>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("4")}
          >
            <Text style={styles.text}>4</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("5")}
          >
            <Text style={styles.text}>5</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("6")}
          >
            <Text style={styles.text}>6</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("-")}
          >
            <Text style={[styles.text, styles.orange]}>-</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.dong}>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("1")}
          >
            <Text style={styles.text}>1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("2")}
          >
            <Text style={styles.text}>2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("3")}
          >
            <Text style={styles.text}>3</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("+")}
          >
            <Text style={[styles.text, styles.orange]}>+</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.dong}>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput("0")}
          >
            <Text style={styles.text}>0</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={styles.cot}
            onPress={() => handleInput(".")}
          >
            <Text style={styles.text}>.</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="gray"
            style={[styles.cot, styles.cot2, styles.bgOrange]}
            onPress={handleCalculate}
          >
            <Text style={styles.text}>=</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
    justifyContent: "space-between",
    padding: 32,
    paddingHorizontal: 16,
  },
  main: {
    height: "65%",
    backgroundColor: "#e6e6e6",
    alignItems: "center",
    justifyContent: "center",
  },
  dong: {
    flex: 1,
    flexDirection: "row",
  },
  cot: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 8,
  },
  cot2: {
    flex: 2.3,
    margin: 8,
  },
  text: {
    fontSize: 25,
  },
  red: {
    color: "red",
  },
  orange: {
    color: "orange",
  },
  bgOrange: {
    backgroundColor: "orange",
  },
  screen: {
    height: "30%",
    width: "100%",
    backgroundColor: "#ececec",
    padding: 16,
    justifyContent: "space-between",
  },
  input: {
    color: "black",
    fontSize: 30,
    alignSelf: "flex-end",
  },
});
