import { StyleSheet, Pressable, Image, Text } from "react-native";
import { font } from "../../constants/Font";
import { Filter } from "../Icons/Filter";

export default function FilterIcon({ style = null, onPress = null }) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Filter />
      <Text style={styles.subtitle}>تحديد النتائج</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    height: 50,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: font.subtitle.fontSize,
  },
});
