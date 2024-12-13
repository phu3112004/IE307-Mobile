import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import ip from "../config/ip";
import ThemeView from "../component/ThemeView";
import ThemeText from "../component/ThemeText";

export default function ProfileScreen() {
  const { theme, setTheme, themeColor } = useContext(ThemeContext);
  const { userToken, logOut, setUserToken } = useContext(AuthContext);
  const navigation = useNavigation();

  const [isModalProfileVisible, setModalProfileVisible] = useState(false);
  const [isModalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [editedName, setEditedName] = useState(userToken.name);
  const [editedUsername, setEditedUsername] = useState(userToken.username);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleLogout = () => {
    logOut();
    navigation.replace("AuthStack");
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("Please fill in all fields.");
      return;
    } else if (currentPassword === newPassword) {
      alert("New password must be different from the current password.");
      return;
    } else if (newPassword !== confirmNewPassword) {
      alert("New password and confirm new password do not match.");
      return;
    } else if (currentPassword !== userToken.password) {
      alert("Current password is incorrect.");
      return;
    }
    try {
      const updatedUser = {
        password: newPassword,
      };
      await axios.patch(`http://${ip}:3000/users/${userToken.id}`, updatedUser);
      setUserToken({ ...userToken, ...updatedUser });
      alert("Password updated successfully!");
      logOut();
      navigation.replace("AuthStack");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Something went wrong, please try again.");
    }
  };

  const handleEditProfile = async () => {
    try {
      const updatedUser = {
        name: editedName,
        username: editedUsername,
      };
      await axios.patch(`http://${ip}:3000/users/${userToken.id}`, updatedUser);
      setUserToken({ ...userToken, ...updatedUser });
      alert("Profile updated successfully!");
      setModalProfileVisible(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <ThemeView style={styles.container}>
      <ThemeView style={styles.coverImageContainer}>
        <Image
          source={{
            uri: "https://png.pngtree.com/thumb_back/fh260/background/20230617/pngtree-illuminated-tree-of-knowledge-sprouting-from-pile-of-books-symbolizing-career-image_3602898.jpg",
          }}
          style={styles.coverImage}
        />
      </ThemeView>

      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri: "https://taoanhdep.com/wp-content/uploads/2023/11/hinhnen-ato.jpg",
          }}
          style={styles.profileImage}
        />
      </View>

      <ThemeView style={styles.infoContainer}>
        <ThemeText style={styles.name}>{userToken.name}</ThemeText>
        <Text style={styles.username}>@{userToken.username}</Text>
      </ThemeView>

      <ThemeView style={styles.themeSelection}>
        <ThemeText
          style={[styles.label, theme === "dark" && { color: "#fff" }]}
        >
          Select Theme
        </ThemeText>
        <ThemeView style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleThemeChange("light")}
          >
            <Icon
              name="sun-o"
              size={16}
              style={{ marginRight: 5 }}
              color={
                theme === "light"
                  ? "#cf3339"
                  : theme === "dark"
                  ? "#fff"
                  : "#000"
              }
            />
            <Text
              style={[
                theme === "light"
                  ? styles.radioSelected
                  : theme === "dark" && { color: "#fff" },
                styles.themeBtn,
              ]}
            >
              Light
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleThemeChange("dark")}
          >
            <Icon
              name="moon-o"
              size={16}
              style={{ marginRight: 5 }}
              color={theme === "dark" ? "#cf3339" : "#000"}
            />
            <Text
              style={[
                theme === "dark" ? styles.radioSelected : null,
                styles.themeBtn,
              ]}
            >
              Dark
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleThemeChange("eye")}
          >
            <Icon
              name="eye"
              size={16}
              style={{ marginRight: 5 }}
              color={
                theme === "eye" ? "#cf3339" : theme === "dark" ? "#fff" : "#000"
              }
            />
            <Text
              style={[
                theme === "eye"
                  ? styles.radioSelected
                  : theme === "dark" && { color: "#fff" },
                styles.themeBtn,
              ]}
            >
              Eye Care
            </Text>
          </TouchableOpacity>
        </ThemeView>
      </ThemeView>

      <ThemeView style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.btn, styles.editButton]}
          onPress={() => setModalProfileVisible(true)}
        >
          <Text style={styles.btnText}>EDIT PROFILE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.editButton]}
          onPress={() => setModalPasswordVisible(true)}
        >
          <Text style={styles.btnText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.logoutButton]}
          onPress={handleLogout}
          color={"#cf3339"}
        >
          <Text style={styles.btnText}>LOG OUT</Text>
        </TouchableOpacity>
      </ThemeView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalProfileVisible}
        onRequestClose={() => setModalProfileVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemeView style={styles.modalContent}>
            <ThemeText style={styles.modalTitle}>Edit Profile</ThemeText>
            <ThemeText>Name</ThemeText>
            <TextInput
              style={[styles.input, theme === "dark" && { color: "#fff" }]}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Enter your name"
              placeholderTextColor={"#888"}
            />
            <ThemeText>Username</ThemeText>
            <TextInput
              style={[styles.input, theme === "dark" && { color: "#fff" }]}
              value={editedUsername}
              onChangeText={setEditedUsername}
              placeholder="Enter your username"
              placeholderTextColor={"#888"}
            />
            <Button
              title="Save"
              onPress={handleEditProfile}
              color={"#4682b4"}
            />
            <ThemeView style={{ marginVertical: 5 }} />
            <Button
              title="Cancel"
              onPress={() => setModalProfileVisible(false)}
              color={"#cf3339"}
            />
          </ThemeView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalPasswordVisible}
        onRequestClose={() => setModalPasswordVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemeView style={styles.modalContent}>
            <ThemeText style={styles.modalTitle}>Change Password</ThemeText>
            <ThemeText>Current Password</ThemeText>
            <TextInput
              style={[styles.input, theme === "dark" && { color: "#fff" }]}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter your current password"
              secureTextEntry={true}
              placeholderTextColor={"#888"}
            />
            <ThemeText>New Password</ThemeText>
            <TextInput
              style={[styles.input, theme === "dark" && { color: "#fff" }]}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter your new password"
              secureTextEntry={true}
              placeholderTextColor={"#888"}
            />
            <ThemeText>Confirm New Password</ThemeText>
            <TextInput
              style={[styles.input, theme === "dark" && { color: "#fff" }]}
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              placeholder="Enter your confirm new password"
              secureTextEntry={true}
              placeholderTextColor={"#888"}
            />
            <Button
              title="Change"
              onPress={handleChangePassword}
              color={"#4682b4"}
            />
            <ThemeView style={{ marginVertical: 5 }} />
            <Button
              title="Cancel"
              onPress={() => setModalPasswordVisible(false)}
              color={"#cf3339"}
            />
          </ThemeView>
        </View>
      </Modal>
    </ThemeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImageContainer: {
    width: "100%",
    height: 200,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  coverImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  profileImageContainer: {
    position: "absolute",
    top: 150,
    left: "50%",
    transform: [{ translateX: -50 }],
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  infoContainer: {
    marginTop: 70,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
    color: "gray",
  },
  themeSelection: {
    marginTop: 20,
    alignItems: "center",
  },

  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  radioGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
  themeBtn: {
    fontSize: 18,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radioSelected: {
    fontWeight: "bold",
    color: "#cf3339",
  },
  btnContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    width: "70%",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4682b4",
  },
  logoutButton: {
    backgroundColor: "#cf3339",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
