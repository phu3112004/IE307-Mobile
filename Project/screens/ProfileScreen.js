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
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ip from "../config/ip";

export default function ProfileScreen() {
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
    <View style={styles.container}>
      <View style={styles.coverImageContainer}>
        <Image
          source={{
            uri: "https://png.pngtree.com/thumb_back/fh260/background/20230617/pngtree-illuminated-tree-of-knowledge-sprouting-from-pile-of-books-symbolizing-career-image_3602898.jpg",
          }}
          style={styles.coverImage}
        />
      </View>

      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri: "https://taoanhdep.com/wp-content/uploads/2023/11/hinhnen-ato.jpg",
          }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{userToken.name}</Text>
        <Text style={styles.username}>@{userToken.username}</Text>
      </View>

      <View style={styles.btnContainer}>
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
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalProfileVisible}
        onRequestClose={() => setModalProfileVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Enter your name"
            />
            <Text>Username</Text>
            <TextInput
              style={styles.input}
              value={editedUsername}
              onChangeText={setEditedUsername}
              placeholder="Enter your username"
            />
            <Button title="Save" onPress={handleEditProfile} color={"#4682b4"} />
            <View style={{marginVertical:5}}/>            
            <Button
              title="Cancel"
              onPress={() => setModalProfileVisible(false)}
              color={"#cf3339"}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalPasswordVisible}
        onRequestClose={() => setModalPasswordVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <Text>Current Password</Text>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter your current password"
              secureTextEntry={true}
            />
            <Text>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter your new password"
              secureTextEntry={true}
            />
            <Text>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              placeholder="Enter your confirm new password"
              secureTextEntry={true}
            />
            <Button title="Change" onPress={handleChangePassword} color={"#4682b4"}/>
            <View style={{marginVertical:5}}/>            
            <Button
              title="Cancel"
              onPress={() => setModalPasswordVisible(false)}
              color={"#cf3339"}
            />
          </View>
        </View>
      </Modal>
    </View>
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
