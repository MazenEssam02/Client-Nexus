import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useNavigation } from "@react-navigation/native";

export default function SpecialitiyItem({ text }) {
  const navigation = useNavigation();
  function onPressHandler() {
    navigation.navigate(
      "SearchResult" as never,
      { speciality: { text } } as never
    );
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressHandler}
      activeOpacity={0.8}
    >
      <Image
        source={require("../../assets/icons/Consult.png")}
        style={{ width: 19, height: 21 }}
      />
      <Text style={[font.subtitle, styles.Text]}>{text}</Text>
    </TouchableOpacity>
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
