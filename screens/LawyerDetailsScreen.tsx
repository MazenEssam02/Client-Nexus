import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Colors } from "../constants/Color";
import LawyerCard from "../components/LawyerCard/LawyerCard";
import LawyerSummarylist from "../components/LawyerSummarylist/LawyerSummarylist";

export default function LawyerDetailsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <LawyerCard
          name={"المحامي عبدالكريم غفار"}
          rate={"4"}
          speciality={"جنائي"}
          address={"وسط البلد"}
          style={styles.card}
          isLawyerDetailsCard={true}
        />
        <View style={styles.summaryContainer}>
          <LawyerSummarylist />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    flex: 1,
    width: "100%",
    maxHeight: 90,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 8,
  },
  summaryContainer: {
    backgroundColor: "white",
    marginVertical: 10,
    height: 110,
    justifyContent: "center",
  },
});
