import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export const sendNotification = async (title, body) => {
  // Kiểm tra và yêu cầu quyền thông báo (nếu chưa có)
  const { status } = await Notifications.getPermissionsAsync();
  console.log("Notification permission status:", status, title, body);

  if (status !== "granted") {
    // Nếu chưa có quyền, yêu cầu cấp quyền thông báo
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== "granted") {
      Alert.alert("Cannot send notification");
      return; // Dừng hàm nếu không có quyền
    }
  }

  // Gửi thông báo cục bộ
  try {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: {
        seconds: 1, // Gửi thông báo ngay lập tức
      },
    });
  } catch (error) {
    console.error("Lỗi khi gửi thông báo:", error);
    Alert.alert("Lỗi", "Không thể gửi thông báo");
  }
};
