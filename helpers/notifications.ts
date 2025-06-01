// // utils/notifications.ts
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";
// import { sendTokenToBackend } from "../API/sendTokenToBackend ";

// async function registerForPushNotificationsAsync() {
//   if (!Device.isDevice) {
//     alert("Must use physical device for push notifications");
//     return null;
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== "granted") {
//     alert("Failed to get push token!");
//     return null;
//   }

//   const tokenData = await Notifications.getExpoPushTokenAsync();
//   return tokenData.data;
// }
// export const getTokenAndSend = async () => {
//   try {
//     const token = await Notifications.getExpoPushTokenAsync();
//     console.log("Expo Push Token:", token.data);
//     sendTokenToBackend(token);
//   } catch (error) {
//     console.error("Error getting token:", error);
//   }
// };
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("تأكد من السماح بوصول التنبيهات!");
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      if (!projectId) throw new Error("Project ID not found");

      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      // console.log("Expo Push Token:", token);
    } catch (error) {
      console.error("Error getting Expo push token:", error);
      token = "";
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
