import { View, Text, StyleSheet, Pressable } from "react-native";
import { RateUp } from "../Icons/RateUp";
import { RateDown } from "../Icons/RateDown";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import { useState } from "react";
const QuestionCard = ({ name, askedBy, rating, question, answer }) => {
  const [support, setSupport] = useState(rating);
  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [{ flex: 9 }, pressed && styles.pressed]}
      >
        <View style={styles.infoSection}>
          <View style={styles.row}>
            <Text style={styles.askedBy}>{askedBy}</Text>
            <Text style={styles.question}>{question}</Text>
          </View>
          <View style={styles.answerContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.answer}>{answer}</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.ratingContainer}>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={() => setSupport((support) => support + 1)}
        >
          <RateUp />
        </Pressable>
        <Text style={styles.rating}>{support}</Text>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={() => setSupport((support) => support - 1)}
        >
          <RateDown />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: 5,
    borderRadius: 8,
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.6,
  },
  infoSection: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 15,
  },
  row: {
    alignItems: "flex-end",
    marginBottom: 7,
  },
  answerContainer: {
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 5,
    alignItems: "flex-end",
  },
  askedBy: {
    fontFamily: font.subtitle.fontFamily,
    fontSize: font.subtitle.fontSize,
  },
  name: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.SecondaryColor,
  },
  question: {
    fontFamily: font.subtitle.fontFamily,
    fontSize: font.subtitle.fontSize,
    marginTop: -5,
  },
  answer: {
    textAlign: "right",
    fontSize: 10,
    fontFamily: font.body.fontFamily,
    color: Colors.SecondaryColor,
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  rating: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginRight: 3,
    marginBlock: 5,
  },
});
export default QuestionCard;
