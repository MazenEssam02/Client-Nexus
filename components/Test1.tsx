import { StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";

export default function Test({ message }) {
  return <Text style={[font.headline, styles.text]}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: Colors.mainColor,
  },
});
