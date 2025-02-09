import { StyleSheet, Pressable, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
//to be edited
const icons = {
  Call: require("../../assets/icons/Call.png"),
  Consult: require("../../assets/icons/Consult.png"),
  On_time: require("../../assets/icons/On_time.png"),
};
////////////////////////////////////////////////////////
export default function NotificationButton({ title, iconName }) {
  return (
    <Pressable style={styles.container} onPress={() => {}}>
      <Image source={icons[iconName]} />
      <Text style={[font.Caption, styles.titleText]}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",

    paddingVertical: 15,
    borderRadius: 15,
    height: 107,
    width: 112,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    color: Colors.SecondaryColor,
  },
});
