// utils/notifications.ts
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { sendTokenToBackend } from "../API/sendTokenToBackend ";

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert("Must use physical device for push notifications");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token!");
    return null;
  }

  const tokenData = await Notifications.getExpoPushTokenAsync();
  return tokenData.data;
}
export const getTokenAndSend = async () => {
  try {
    const token = await Notifications.getExpoPushTokenAsync();
    console.log("Expo Push Token:", token.data);
    sendTokenToBackend(token);
  } catch (error) {
    console.error("Error getting token:", error);
  }
};
