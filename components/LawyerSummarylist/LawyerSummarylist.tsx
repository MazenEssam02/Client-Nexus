import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/Color";
import Medal from "../Icons/MedalIcon";
import Messages from "../Icons/MessageIcon";
import Star from "../Icons/StarIcon";
import { font } from "../../constants/Font";
export default function LawyerSummaryList({
  lawyer = { visitors: 5, rate: 3, experiance: 10 },
}) {
  return (
    <View style={styles.iconsListContainer}>
      <View style={styles.summarryItemContainer}>
        <View style={styles.IconContainer}>
          <Messages />
        </View>
        <Text style={styles.summaryNumber}>{lawyer.visitors}</Text>
        <Text style={styles.summaryTitle}>زائر</Text>
      </View>
      <View style={styles.summarryItemContainer}>
        <View style={styles.IconContainer}>
          <Star />
        </View>
        <Text style={styles.summaryNumber}>{lawyer.rate}</Text>
        <Text style={styles.summaryTitle}>تقييم</Text>
      </View>
      <View style={styles.summarryItemContainer}>
        <View style={styles.IconContainer}>
          <Medal />
        </View>
        <Text style={styles.summaryNumber}>{lawyer.experiance}</Text>
        <Text style={styles.summaryTitle}>خبرة</Text>
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
