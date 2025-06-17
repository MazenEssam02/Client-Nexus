import { View, Text, StyleSheet, Pressable } from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import getAge from "../../utils/getAgeFromDate";
const QuestionCard = ({ ...questionItem }) => {
  const age = getAge(questionItem.clientBirthDate);
  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [{ flex: 9 }, pressed && styles.pressed]}
      >
        <View style={styles.infoSection}>
          <View style={styles.row}>
            <Text style={styles.askedBy}>
              {questionItem.clientGender === 77
                ? `سأل ذكر ${age} سنة`
                : `سألت انثى ${age} سنة`}
            </Text>
            <Text style={styles.question}>
              {questionItem.questionBody ? questionItem.questionBody : "none"}
            </Text>
          </View>
          <View style={styles.answerContainer}>
            <Text style={styles.name}>
              {questionItem.serviceProviderFirstName
                ? questionItem.serviceProviderFirstName +
                  " " +
                  questionItem.serviceProviderLastName
                : "لا يوجد اجابة"}
            </Text>
            <Text style={styles.answer}>
              {questionItem.answerBody
                ? questionItem.answerBody
                : "لا يوجد اجابة"}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: 5,
    borderRadius: 8,
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.6,
  },
  infoSection: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
    paddingBottom: 15,
  },
  row: {
    alignItems: "flex-end",
    marginBottom: 7,
  },
  answerContainer: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    alignItems: "flex-end",
  },
  askedBy: {
    fontFamily: font.subtitle.fontFamily,
    fontSize: 9,
  },
  name: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.SecondaryColor,
  },
  question: {
    fontFamily: font.Caption.fontFamily,
    fontSize: font.Caption.fontSize,
    marginTop: -3,
    color: Colors.mainColor,
  },
  answer: {
    textAlign: "right",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10,
    fontFamily: font.body.fontFamily,
    color: Colors.SecondaryColor,
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  rating: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginRight: 3,
    marginBlock: 5,
  },
});
export default QuestionCard;
