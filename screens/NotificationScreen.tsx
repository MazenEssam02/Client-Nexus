import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";

export default function NotificationScreen() {
  return <View style={styles.container}></View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
