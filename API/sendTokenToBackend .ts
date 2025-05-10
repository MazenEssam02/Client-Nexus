import { apiClient } from "./https";

export async function sendTokenToBackend(token: string) {
  try {
    const response = await apiClient.patch("/api/users/notification-token", {
      token,
    });
    console.log("Push token sent to backend successfully", response.data);
  } catch (error) {
    console.error(
      "Failed to send token to backend:",
      error.response?.data || error.message
    );
  }
}
