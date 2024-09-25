import { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

function Item({ name = "exercise", onSelect }) {
  const [isSelected, setIsSelected] = useState(false);
  const handleSelect = () => {
    setIsSelected(!isSelected);
    onSelect((prevItems) => {
      if (isSelected) {
        return prevItems.filter((item) => item !== name);
      } else {
        return [...prevItems, name];
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>
          {isSelected ? "DESELECT" : "SELECT"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 4,
    padding: 6,
    borderRadius: 8,
  },
  name: {
    fontSize: 15,
  },
  button: {
    backgroundColor: "#1f96f2",
    color: "white",
    padding: 8,
    minWidth: 100,
    borderRadius: 3,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});
export default Item;
