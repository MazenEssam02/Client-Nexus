import { useEffect, useRef } from "react";
import { registerForPushNotificationsAsync } from "../helpers/notifications";
import * as Notifications from "expo-notifications";
import { sendTokenToBackend } from "../API/sendTokenToBackend ";
import { useAuthStore } from "../store/auth";
export function usePushNotifications(navigation: any) {
  const responseListener = useRef<Notifications.EventSubscription | null>(null);
  const authToken = useAuthStore()?.user?.authToken;
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (authToken && token) {
        sendTokenToBackend(token);
      }
    });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigation.navigate("Notification");
      });

    return () => {
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);
}
