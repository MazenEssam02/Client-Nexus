import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";

const UserQuestionCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.subtitle}>استشارة رقم: </Text>
          <Text style={styles.caption}>{item.id}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.subtitle}>تاريخ الاستشارة: </Text>
          <Text style={styles.caption}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.column}>
          <Text style={styles.subtitle}>حالة الاستشارة:</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Pressable
        style={styles.detailsButton}
        onPress={() => navigation.navigate("QuestionDetails" as never)}
      >
        <Text style={styles.detailsButtonText}>تفاصيل السؤال</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    marginBottom: 10,
    rowGap: 10,
  },
  row: {
    flexDirection: "row-reverse",
    marginBottom: 8,
  },
  column: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  subtitle: {
    fontSize: font.subtitle.fontSize,
    fontFamily: font.subtitle.fontFamily,
  },
  caption: {
    fontSize: font.Caption.fontSize,
    fontFamily: font.Caption.fontFamily,
    marginRight: 3,
  },
  statusContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 10,
  },
  statusText: {
    backgroundColor: Colors.invalidColor200,
    color: "#FFF",
    fontSize: font.subtitle.fontSize,
    fontFamily: font.subtitle.fontFamily,
    padding: 8,
    paddingInline: 13,
    borderRadius: 8,
    marginRight: 25,
  },
  detailsButton: {
    backgroundColor: Colors.mainColor,
    width: "40%",
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: font.Button.fontSize,
    fontFamily: font.Button.fontFamily,
  },
});
export default UserQuestionCard;
