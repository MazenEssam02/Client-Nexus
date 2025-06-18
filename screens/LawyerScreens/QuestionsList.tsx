import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ScreensWrapper from "../ScreensWrapper/ScreensWrapper";
import { useQuery } from "@tanstack/react-query";
import { Client, ServiceProvider } from "../../API/https";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import IsError from "../../components/IsError/IsError";
import NoResponse from "../../components/NoResponse/NoResponse";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import TopNav from "../../components/TopNav/TopNav";
import { QuestionCardLawyer } from "../../components/PreviewCard/QuestionCardLawyer";

export default function QuestionsList({ navigation }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["UnansweredQuestions"],
    queryFn: async () => {
      const response = await ServiceProvider.getUnansweredQA();
      const fullItems = await Promise.all(
        response.data.map(async (item) => {
          const client = await Client.get(item.clientId);
          return { ...item, client: client.data.data };
        })
      );
      return fullItems;
    },
    refetchInterval: 5000,
  });

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
        onLeftTabPress={() => navigation.navigate("LawyerQAPrev" as never)}
      />
      <FlatList
        data={data}
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
    backgroundColor: Colors.background,
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
