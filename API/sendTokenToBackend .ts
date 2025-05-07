import { apiClient } from "./https";

export const sendTokenToBackend = async (token) => {
  try {
    await apiClient.patch("/api/users/notification-token", { token });
    console.log("Token sent to backend successfully");
  } catch (err) {
    console.error("Error sending token to backend:", err);
  }
};
