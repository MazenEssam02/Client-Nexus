import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

export default function AskQuestionBlock() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icons/Icon_Question.png")} />
      <Text style={[font.subtitle, styles.Text]}>لديك سؤال قانونى؟</Text>
      {/* Button */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row-reverse",
    paddingVertical: 15,
    paddingHorizontal: 10,
    height: 60,
    width: "100%",
    alignItems: "center",
    marginVertical: 11,
    borderRadius: 15,
  },
  Text: {
    color: Colors.SecondaryColor,
    paddingRight: 6,
    height: "100%",
    textAlignVertical: "center",
    // width: "100%",
    // textAlign: "right",
  },
});
