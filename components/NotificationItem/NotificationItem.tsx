import { Linking, Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import DateToString from "../../utils/DateToString";

export default function NotificationItem({
  title,
  text,
  date,
  onPress = null,
}) {
  const urlRegex = /(https?:\/\/[^\s]+)/;

  const parts = text.split(urlRegex);
  // console.log(parts);
  const formattedDate = DateToString(date);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={[font.title, styles.title]}>{title}</Text>
      <Text style={[font.body, styles.text]}>
        {parts.map((part, index) =>
          urlRegex.test(part) ? (
            <Text
              key={index}
              style={{ textDecorationLine: "underline" }}
              onPress={() => Linking.openURL(part)}
            >
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          )
        )}
      </Text>
      <Text style={[font.subtitle, styles.text]}>{formattedDate}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: 110,
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
