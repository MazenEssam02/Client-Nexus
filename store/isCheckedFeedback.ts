import AsyncStorage from "@react-native-async-storage/async-storage";

const isCheckedFeedback = async (appointmentId: string) => {
  const shown = await AsyncStorage.getItem(`feedback_shown_${appointmentId}`);

  if (!shown) {
    // Mark it as shown
    await AsyncStorage.setItem(`feedback_shown_${appointmentId}`, "true");
    return false;
  }
  return true;
};
export default isCheckedFeedback;
