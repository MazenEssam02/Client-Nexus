import { StyleSheet, Pressable, Text, Image } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

export default function NotificationButton({ title, imageLink }) {
  return (
    <Pressable style={styles.container} onPress={() => {}}>
      <Image
        source={{
          uri: imageLink,
        }}
        style={styles.imagecontainer}
      />
      <Text numberOfLines={2} style={[font.Caption, styles.titleText]}>
        {title}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    borderRadius: 15,
    height: 210,
    width: 210,
    backgroundColor: "white",
    justifyContent: "space-between",
    marginHorizontal: 7,
  },
  imagecontainer: {
    width: "100%",
    height: "75%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  titleText: {
    color: Colors.SecondaryColor,
    textAlign: "right",
    padding: 5,
  },
});
