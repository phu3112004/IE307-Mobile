import { NavigationContainer } from "@react-navigation/native";
import MainTab from "./MainTab";
import AuthStack from "./AuthStack";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const AppNavigator = () => {
  const { userToken } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {userToken ? <MainTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
