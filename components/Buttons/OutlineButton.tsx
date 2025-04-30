import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

function OutlinedButton({ onPress, icon, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colors.mainColor}
      />
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.mainColor,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginLeft: 6,
  },
  text: {
    color: Colors.SecondaryColor,
    ...font.Button,
  },
});
