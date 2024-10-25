import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Mode from "./Mode";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [listFeedback, setListFeedback] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotify, setIsNotify] = useState(true);
  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleNotify = () => {
    setIsNotify(!isNotify);
  };
  const handleChangeText = (text) => {
    setFeedback(text);
  };
  const showAlert = () => {
    if (isNotify) Alert.alert("Thank you for your feedback!");
  };
  const handleSend = () => {
    if (feedback.trim() !== "") {
      showAlert();
      setListFeedback([...listFeedback, feedback]);
      setFeedback("");
    }
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#000" : "#fff" },
      ]}
    >
      <Image
        source={{
          uri: "https://res.cloudinary.com/practicaldev/image/fetch/s--qo_Wp38Z--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/e0nl7ziy1la7bpwj7rsp.png",
        }}
        style={styles.logo}
      />
      <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
        React Native App
      </Text>
      <View style={styles.itemContainer}>
        <Mode
          name="Dark Mode"
          isDarkMode={isDarkMode}
          toggle={handleDarkMode}
          darkModeText={isDarkMode}
        />
        <Mode
          name="Notifications"
          isNotify={isNotify}
          toggle={handleNotify}
          darkModeText={isDarkMode}
        />
      </View>
      <View style={styles.itemContainer}>
        <Text style={{ color: isDarkMode ? "#fff" : "#000", fontSize: 18 }}>
          Feedback
        </Text>
        <TextInput
          style={[styles.input, { color: isDarkMode ? "#fff" : "#000" }]}
          placeholder="Your feedback here..."
          placeholderTextColor="#999"
          onChangeText={handleChangeText}
          value={feedback}
        />
        <Button title="SEND FEEDBACK" onPress={handleSend} />
      </View>
      <View style={styles.itemContainer}>
        <Text
          style={[
            styles.feedbackTitle,
            { color: isDarkMode ? "#fff" : "#000" },
          ]}
        >
          Frequently Asked Questions:
        </Text>
      </View>
      <ScrollView style={styles.listFeedback}>
        {listFeedback.map((feedback, index) => (
          <Text key={index} style={{ color: isDarkMode ? "#fff" : "#000" }}>
            {`Q: ${feedback}`}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 999,
  },
  itemContainer: {
    width: "80%",
    marginVertical: 8,
  },
  input: {
    borderColor: "#ddd",
    borderStyle: "solid",
    borderWidth: 1,
    minHeight: 100,
    textAlignVertical: "top",
    marginVertical: 8,
    padding: 4,
  },
  feedbackTitle: {
    fontSize: 20,
    marginVertical: 8,
    fontWeight: "600",
  },
  listFeedback: {
    width: "80%",
    maxHeight: 300,
  },
});
