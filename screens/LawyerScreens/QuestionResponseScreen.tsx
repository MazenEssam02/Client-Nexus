import React, { use, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { MainButton } from "../../components/Buttons/MainButton";
import { TextAreaInput } from "../../components/TextAreaInput/TextAreaInput";
import { apiClient } from "../../API/https";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

if (!I18nManager.isRTL) {
  I18nManager.forceRTL(true);
}

export default function QuestionResponseScreen({ route }) {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const question = route.params;
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await apiClient.post(`/api/qa/answer/${question.id}`, {
        AnswerBody: answer,
      });
      //   reset react query cache or navigate back
      queryClient.invalidateQueries(["UnansweredQuestions"] as any);
      queryClient.invalidateQueries(["AnsweredQuestions"] as any);
      navigation.goBack();
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting answer:", JSON.stringify(error, null, 2));
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.questionSection}>
          <Text style={styles.title}>السؤال</Text>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{question.questionBody}</Text>
          </View>
          <Text style={styles.answeredText}>تم طرح السؤال في</Text>
          <Text style={styles.dateText}>
            {new Date(question.createdAt).toLocaleDateString("ar-EG")}
          </Text>
        </View>

        {question.answerBody && (
          <View style={styles.answerSection}>
            <Text style={styles.label}>الاجابة</Text>
            <Text style={styles.answerText}>{question.answerBody}</Text>
            <Text style={styles.answeredText}>تم الرد في</Text>
            <Text style={styles.dateText}>
              {new Date(question.answeredAt).toLocaleDateString("ar-EG")}
            </Text>
          </View>
        )}

        {!question.answerBody && (
          <View style={styles.answerSection}>
            <Text style={styles.label}>الاجابة</Text>
            <TextAreaInput
              value={answer}
              onChangeText={setAnswer}
              placeholder="اكتب إجابتك هنا..."
            />
          </View>
        )}

        {!question.answerBody && (
          <View style={{ height: 50 }}>
            <MainButton
              title="إرسال الإجابة"
              onPress={handleSubmit}
              disabled={!answer.trim() || isLoading}
            />
          </View>
        )}

        {question.isAnswerHelpful && (
          <View>
            <Text style={styles.label}>
              وجد {question.client.firstName} {question.client.lastName} الاجابة
              مفيدة
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background || "#f0f0f0",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  questionSection: {
    marginBottom: 20,
  },
  title: {
    ...font.title,
    color: Colors.mainColor || "#333", // Changed from Colors.primary
    textAlign: "right",
  },
  questionBox: {
    padding: 15,
  },
  questionText: {
    ...font.body,
    lineHeight: 24,
  },
  answerSection: {
    marginBottom: 30,
  },
  label: {
    ...font.title,
    color: Colors.mainColor || "#333", // Changed from Colors.primary
    textAlign: "right",
    marginBottom: 10,
  },
  answerText: {
    ...font.body,
    lineHeight: 24,
    backgroundColor: Colors.background || "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  answeredText: {
    ...font.subtitle,
    color: Colors.mainColor || "#333", // Changed from Colors.primary
    textAlign: "right",
  },
  dateText: {
    ...font.Caption,
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
});
