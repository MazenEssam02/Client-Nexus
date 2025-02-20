import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import DateToString from "../../utils/DateToString";

export default function NotificationItem({
  title,
  text,
  date,
  onPress = null,
}) {
  const formattedDate = DateToString(date);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={[font.title, styles.title]}>{title}</Text>
      <Text style={[font.body, styles.text]}>{text}</Text>
      <Text style={[font.subtitle, styles.text]}>{formattedDate}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 110,
    width: "100%",
    borderBottomColor: Colors.SecondaryColor,
    borderBottomWidth: 1,
    paddingVertical: 4,
    justifyContent: "space-between",
  },
  title: {
    textAlign: "right",
    color: Colors.SecondaryColor,
  },
  text: {
    textAlign: "right",
    color: Colors.SecondaryColor,
  },
});
