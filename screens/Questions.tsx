import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Data from "../api-mock/Questions.json";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import FixedButton from "../components/floatbutton/FixedButton";
import { useNavigation } from "@react-navigation/native";
const Questions = () => {
  const navigation = useNavigation();
  function addQuestion() {
    navigation.navigate("QuestionForm" as never);
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <QuestionCard {...item} />}
        contentContainerStyle={styles.list}
      />
      <FixedButton pressedHandle={addQuestion} />
    </SafeAreaView>
  );
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
