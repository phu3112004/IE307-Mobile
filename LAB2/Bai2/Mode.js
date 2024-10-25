import { View, Text, StyleSheet, Switch } from "react-native";

export default function Mode({
  name,
  isDarkMode,
  isNotify,
  toggle,
  darkModeText,
}) {
  return (
    <View style={styles.container}>
      <Text style={{ color: darkModeText ? "#fff" : "#000" }}>{name}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#33FF66" }}
        thumbColor="#f4f3f4"
        onValueChange={toggle}
        value={name === "Dark Mode" ? isDarkMode : isNotify}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
