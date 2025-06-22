import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { MainButton } from "../Buttons/MainButton";
import { useNavigation } from "@react-navigation/native";
import QuestionIcon from "../Icons/QuestionIcon";
export default function AskQuestionBlock({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.rightContainer}>
        <QuestionIcon />
        <Text style={[font.subtitle, styles.Text]}>لديك سؤال قانونى؟</Text>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          title="اسأل الآن"
          onPress={() => {
            navigation.navigate("QuickAccess", {
              screen: "Profile",
            });
            // Then push Questions after a short delay
            setTimeout(() => {
              navigation.navigate("QuickAccess", {
                screen: "Questions",
              });
            }, 10);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    height: 60,
    width: "100%",
    alignItems: "center",
    marginVertical: 11,
    borderRadius: 15,
  },
  rightContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  Text: {
    color: Colors.SecondaryColor,
    paddingRight: 6,
    height: "100%",
    textAlignVertical: "center",
  },
  buttonContainer: {
    alignSelf: "center",
    height: 32,
    width: 85,
  },
});
