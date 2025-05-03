import { View, StyleSheet, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import QuestionCard from "../components/QuestionCard/QuestionCard";

export default function LawyerQAScreen() {
  const route = useRoute();
  const { lawyerQA } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.QAContainer}>
      <View style={styles.list}>
        <FlatList
          data={lawyerQA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <QuestionCard questionItem={item} />}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  QAContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  list: {
    padding: 10,
  },
});
