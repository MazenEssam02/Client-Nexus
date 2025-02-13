import { StyleSheet, Pressable, Image, Text } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

export default function FilterIcon({ style = null }) {
  return (
    <Pressable style={[styles.container, style]} onPress={() => {}}>
      <Image source={require(`../../assets/icons/Icon_Add.png`)} />
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
