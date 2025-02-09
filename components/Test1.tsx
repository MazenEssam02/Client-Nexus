import { StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Color";
export default function Test({ message }) {
  return <Text style={styles.text}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: Colors.mainColor,
  },
});
