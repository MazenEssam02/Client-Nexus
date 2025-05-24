import { StyleSheet, Pressable, Text, Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import OnTime from "../Icons/OnTime";
import Call from "../Icons/Call";
import ConsultLarge from "../Icons/ConsultLarge";

export default function QuickButton({ title, iconName, onPress }) {
  function LogoPicker() {
    switch (iconName) {
      case "Consult":
        return <ConsultLarge />;
      case "OnTime":
        return <OnTime />;
      case "Call":
        return <Call />;
    }
  }
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <LogoPicker />
      </View>

      <Text style={[font.Caption, styles.titleText]}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    backgroundColor: "white",
    paddingVertical: 25,
    borderRadius: 15,
    height: 105,
    width: "30%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.6,
  },
  iconContainer: {
    height: "90%",
  },
  titleText: {
    color: Colors.SecondaryColor,
  },
});
