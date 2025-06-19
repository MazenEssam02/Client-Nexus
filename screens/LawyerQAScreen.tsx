import { View, StyleSheet, Text, FlatList } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import QuestionCard from "../components/QuestionCard/QuestionCard";

type LawyerQAScreenRouteParams = {
  params: {
    lawyerQA: { id: string; [key: string]: any }[];
  };
};

export default function LawyerQAScreen() {
  const route = useRoute<RouteProp<LawyerQAScreenRouteParams, "params">>();
  const { lawyerQA } = route.params;
  console.log(lawyerQA);

  return (
    <View style={styles.QAContainer}>
      <View style={styles.list}>
        <FlatList
          data={lawyerQA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <QuestionCard {...item} />}
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
