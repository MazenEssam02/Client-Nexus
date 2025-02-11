import { StyleSheet, Text, Image, Pressable } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

export default function SpecialitiyItem({ text, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={require("../../assets/icons/Consult.png")}
        style={{ width: 19, height: 21 }}
      />
      <Text style={[font.subtitle, styles.Text]}>{text}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    height: 48,
    width: "100%",
    borderBottomColor: Colors.SecondaryColor,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  Text: {
    paddingRight: 10,
    color: Colors.SecondaryColor,
  },
});
