import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Color";
import WeeklyAvailabilityManager from "../../components/WeeklyAvailabilityManager";

const LawyerGenerateSlots = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <WeeklyAvailabilityManager />
      </ScrollView>
    </View>
  );
};

export default LawyerGenerateSlots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
