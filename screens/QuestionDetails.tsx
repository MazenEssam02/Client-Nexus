import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";

const QuestionDetails = () => {
  const [feedback, setFeedback] = useState(null); // Track user feedback

  const question = "ما الأوراق المطلوبة لرفع دعوى قضائية للتمكين من شقة؟";
  const answer = `ستحتاج إلى:
  - عقد الإيجار
  - بطاقة الرقم القومي
  - إثبات الإقامة
  - إيصالات سداد الإيجار

  تم الرد بواسطة المحامي: هاني عبدالوهاب`;

  return (
    <View style={styles.container}>
      {/* Question */}
      <View style={styles.questionBubble}>
        <Text style={styles.questionText}>{question}</Text>
      </View>

      {/* Lawyer's Response */}
      <View style={styles.answerBubble}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>

      {/* Feedback Section */}
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackTitle}>ما رأيك في الإجابة</Text>
        <View style={styles.feedbackButtons}>
          <TouchableOpacity
            style={[
              styles.feedbackButton,
              feedback === "useful" && styles.selectedButton,
            ]}
            onPress={() => setFeedback("useful")}
          >
            <Text style={styles.feedbackText}>مفيد ✅</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.feedbackButton,
              feedback === "notUseful" && styles.selectedButton,
            ]}
            onPress={() => setFeedback("notUseful")}
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
