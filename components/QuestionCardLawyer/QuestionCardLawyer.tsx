import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import { useNavigation } from "@react-navigation/native";
import getAge from "../../helpers/getAgeFromDate";
import { MainButton } from "../Buttons/MainButton";

export const QuestionCardLawyer = (questionItem) => {
  const navigation = useNavigation();

  // Use client data if available, otherwise fallback to questionItem properties
  const clientGender = questionItem.client?.gender || questionItem.clientGender;
  const clientBirthDate =
    questionItem.client?.birthDate || questionItem.clientBirthDate;
  const clientName = questionItem.client
    ? `${questionItem.client.firstName} ${questionItem.client.lastName}`
    : null;

  const age = getAge(clientBirthDate);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.nameText}>
            {questionItem.client.firstName} {questionItem.client.lastName}
          </Text>
          <Text style={styles.titleText}>
            {questionItem.clientGender === 77 ? "رجل" : "سيدة"} {age} سنة
          </Text>
        </View>
        <Image
          source={
            questionItem.client.mainImage
              ? { uri: questionItem.client.mainImage }
              : require("../../assets/user.jpg")
          }
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.descriptionText}>
        {questionItem.questionBody || "لا يوجد نص للسؤال"}
      </Text>

      <View style={styles.button}>
        <MainButton
          title="قراءة المزيد"
          onPress={() =>
            (navigation as any).navigate("LawyerQAResponse", questionItem)
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    padding: 20,
    margin: 10,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  userInfoContainer: {
    flex: 1,
    marginRight: 15,
    alignItems: "flex-end",
  },
  profileImage: {
    width: 70,
    height: 70,
  },
  nameText: {
    ...font.headline,
    fontWeight: "bold",
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
  titleText: {
    ...font.subtitle,
    fontSize: 16,
    color: Colors.SecondaryColor,
    textAlign: "right",
    marginTop: 2,
  },
  descriptionText: {
    ...font.body,
    fontSize: 15,
    color: Colors.SecondaryColor,
    lineHeight: 22,
    textAlign: "right",
    marginBottom: 20,
  },
  button: {
    height: 40,
    width: 120,
  },
});
