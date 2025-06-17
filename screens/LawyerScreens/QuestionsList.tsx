import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ScreensWrapper from "../ScreensWrapper/ScreensWrapper";
import { useQuery } from "@tanstack/react-query";
import { Client, ServiceProvider } from "../../API/https";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import IsError from "../../components/IsError/IsError";
import NoResponse from "../../components/NoResponse/NoResponse";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import QuestionCardLawyer from "../../components/QuestionCardLawyer/QuestionCardLawyer";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import TopNav from "../../components/TopNav/TopNav";

export default function QuestionsList({ navigation }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["UnansweredQuestions"],
    queryFn: ServiceProvider.getUnansweredQA,
    refetchInterval: 5000,
  });
  const QuestionsList = data?.data;

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <IsError error={error} />;
  }

  if (QuestionsList.length === 0) {
    return <NoResponse text="مفيش اسألة خلصني" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopNav
        leftText="الأسئلة السابقة"
        rightText="الأسئلة الحالية"
        activeTab="right"
      />
      <FlatList
        data={QuestionsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <QuestionCardLawyer {...item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    padding: 10,
  },
  containerWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.SecondaryColor,
  },
  contentArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    height: 50,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  text: {
    ...font.title,
    color: "white",
    textAlign: "center",
  },
  activeText: {
    textDecorationLine: "underline",
    textDecorationColor: "white",
  },
  separator: {
    width: 1.5,
    height: "75%",
    backgroundColor: Colors.SecondaryColor,
  },
});
