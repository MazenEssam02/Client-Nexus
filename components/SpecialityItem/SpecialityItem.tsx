import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useNavigation } from "@react-navigation/native";
import Consult from "../Icons/Consult";

export default function SpecialitiyItem({ text, index }) {
  const navigation = useNavigation();
  function onPressHandler() {
    navigation.navigate(
      "SearchResult" as never,
      { requestName: text } as never
    );
  }
  return (
    <TouchableOpacity
      style={[styles.container, index === 0 ? { borderTopWidth: 1 } : {}]}
      onPress={onPressHandler}
      activeOpacity={0.8}
    >
      <Consult />
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
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  Text: {
    paddingRight: 10,
    color: Colors.SecondaryColor,
  },
});
