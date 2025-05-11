import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { Client } from "../API/https";

const QuestionDetails = ({ route }) => {
  const data = route.params.Question;
  const [feedback, setFeedback] = useState(null); // Track user feedback

  const question =
    data.questionBody || "ما الأوراق المطلوبة لرفع دعوى قضائية للتمكين من شقة؟";
  const answer =
    data.status === 68 ? data.answerBody : "لا توجد اجابة لهذا السؤال بعد";
  useEffect(() => {
    if (feedback) {
      Client.submitQAFeedback(data.id, feedback)
        .then((response) => Alert.alert("تم اضافة رأيك بنجاح"))
        .catch((err) => {
          Alert.alert("برجاء المحاولة مره اخري");
          console.log(err);
        });
    }
  }, [feedback]);
  return (
    <View style={styles.container}>
      <View style={styles.questionBubble}>
        <Text style={styles.questionText}>{question}</Text>
      </View>

      <View
        style={[
          styles.answerBubble,
          data.status !== 68 && { backgroundColor: Colors.invalidColor600 },
        ]}
      >
        <Text style={[styles.answerText]}>{answer}</Text>
      </View>

      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackTitle}>ما رأيك في الإجابة</Text>
        <View style={styles.feedbackButtons}>
          <TouchableOpacity
            style={[
              styles.feedbackButton,
              feedback === "true" && styles.selectedButton,
            ]}
            onPress={() => setFeedback("true")}
          >
            <Text style={styles.feedbackText}>مفيد ✅</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.feedbackButton,
              feedback === "fasle" && styles.selectedButton,
            ]}
            onPress={() => setFeedback("false")}
          >
            <Text style={styles.feedbackText}>غير مفيد ❌</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  questionBubble: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 20,
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  questionText: {
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
  answerBubble: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 50,
    width: "90%",
  },
  answerText: {
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
    color: Colors.SecondaryColor,
  },
  feedbackContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  feedbackTitle: {
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
    marginBottom: 10,
  },
  feedbackButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  feedbackButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "45%",
  },
  selectedButton: {
    backgroundColor: "#A56A39",
  },
  feedbackText: {
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
  },
});

export default QuestionDetails;
