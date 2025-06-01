import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import UserQuestionCard from "../components/QuestionCard/UserQuestionCard";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { useQuery } from "@tanstack/react-query";
import { Client } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import IsError from "../components/IsError/IsError";
import NoResponse from "../components/NoResponse/NoResponse";

const MyQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const {
    data: MyQuestionsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["MyQuestions"],
    queryFn: Client.getMyQA,
  });
  useEffect(() => {
    if (MyQuestionsData?.data) {
      setQuestions(MyQuestionsData.data);
    }
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <IsError error={error} />;
  }
  if (questions.length === 0) {
    return <NoResponse text="لا توجد اسئلة لك" />;
  }
  return (
    <View style={styles.container}>
      {questions.length === 0 ? (
        <Text style={styles.noQuestions}>لا يوجد أي أسئلة قانونية</Text>
      ) : (
        <FlatList
          data={questions.reverse()}
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
