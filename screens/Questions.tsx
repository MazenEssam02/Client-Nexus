import { FlatList, StyleSheet, SafeAreaView, View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import FixedButton from "../components/floatbutton/FixedButton";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { Client } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import IsError from "../components/IsError/IsError";
import NoResponse from "../components/NoResponse/NoResponse";
const Questions = () => {
  const navigation = useNavigation();
  function addQuestion() {
    navigation.navigate("QuestionForm" as never);
  }
  const [data, setData] = useState([]);
  const {
    data: QuestionsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Questions"],
    queryFn: Client.getAllQuestions,
    refetchInterval: 5000,
  });
  useEffect(() => {
    if (QuestionsData?.data) {
      setData(QuestionsData.data);
    }
  }, [QuestionsData, setData]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <IsError error={error} />;
  }
  if (data.length === 0) {
    return <NoResponse text="لا يوجد اسئلة " />;
  }
  if (data.length > 0) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          inverted
          renderItem={({ item }) => <QuestionCard {...item} />}
          contentContainerStyle={styles.list}
        />
        <FixedButton pressedHandle={addQuestion} />
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    padding: 10,
  },
});
export default Questions;
