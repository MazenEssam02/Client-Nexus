import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Color";

export default function NotificationButton({ onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name="notifications" size={20} color={Colors.mainColor} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: Colors.SecondaryColor,
    borderRadius: 100,
    height: 34,
    width: 34,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.6,
  },
});
