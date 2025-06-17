import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/Color";
import Medal from "../Icons/MedalIcon";
import Messages from "../Icons/MessageIcon";
import Star from "../Icons/StarIcon";
import { font } from "../../constants/Font";
export default function LawyerSummaryList({
  rate,
  yearsOfExperience,
  lawyerVisitors = 0,
}) {
  return (
    <View style={styles.iconsListContainer}>
      <View style={styles.summarryItemContainer}>
        <View style={styles.IconContainer}>
          <Messages />
        </View>
        <Text style={styles.summaryNumber}>{lawyerVisitors}</Text>
        <Text style={styles.summaryTitle}>زائر</Text>
      </View>
      <View style={styles.summarryItemContainer}>
        <View style={styles.IconContainer}>
          <Star />
        </View>
        <Text style={styles.summaryNumber}>{rate.toFixed(2)}</Text>
        <Text style={styles.summaryTitle}>تقييم</Text>
      </View>
      <View style={styles.summarryItemContainer}>
        <View style={styles.IconContainer}>
          <Medal />
        </View>
        <Text style={styles.summaryNumber}>{yearsOfExperience}</Text>
        <Text style={styles.summaryTitle}>سنين الخبرة</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  iconsListContainer: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
  },
  summarryItemContainer: {
    flexDirection: "column",
  },
  IconContainer: {
    borderRadius: 100,
    height: 56,
    width: 56,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryNumber: {
    color: Colors.SecondaryColor,
    ...font.Caption,
    textAlign: "center",
  },
  summaryTitle: {
    color: Colors.SecondaryColor,
    ...font.subtitle,
    textAlign: "center",
  },
});
