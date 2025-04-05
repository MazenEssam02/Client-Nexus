import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import UserQuestionCard from "../components/QuestionCard/UserQuestionCard";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";

const MyQuestion = () => {
  const [questions, setQuestions] = useState([
    {
      id: 101,
      date: "30/10/2024",
      status: "جاري الرد",
    },
  ]);

  return (
    <View style={styles.container}>
      {questions.length === 0 ? (
        <Text style={styles.noQuestions}>لا يوجد أي أسئلة قانونية</Text>
      ) : (
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserQuestionCard item={item} />}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    // alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  noQuestions: {
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
    color: "#000",
  },
});
export default MyQuestion;
