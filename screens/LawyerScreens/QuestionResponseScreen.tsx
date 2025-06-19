import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  I18nManager,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { MainButton } from "../../components/Buttons/MainButton";
import { TextAreaInput } from "../../components/TextAreaInput/TextAreaInput";
import { apiClient } from "../../API/https";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation, NavigationProp } from "@react-navigation/native"; // Import NavigationProp
// Optional: For the "helpful" icon
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Type Definitions (Recommended) ---
interface Client {
  firstName: string;
  lastName: string;
}

interface QuestionData {
  id: string | number;
  questionBody: string;
  createdAt: string | Date;
  answerBody?: string;
  answeredAt?: string | Date;
  isAnswerHelpful?: boolean;
  client?: Client;
}

interface QuestionResponseScreenRouteParams {
  params: QuestionData;
}

// --- Helper Functions ---
const formatDate = (dateString?: string | Date) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function QuestionResponseScreen({
  route,
}: {
  route: QuestionResponseScreenRouteParams;
}) {
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProp<any>>(); // Add type for navigation
  const question: QuestionData = route.params;

  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setIsLoading(true);
    try {
      await apiClient.post(`/api/qa/answer/${question.id}`, {
        AnswerBody: answer,
      });
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["UnansweredQuestions"] });
      queryClient.invalidateQueries({ queryKey: ["AnsweredQuestions"] });
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error submitting answer:", JSON.stringify(error, null, 2));
      // Optionally: Show an alert or toast message to the user
      // Alert.alert("خطأ", "لم نتمكن من إرسال إجابتك. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* --- Question Section --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>السؤال</Text>
          <Text style={styles.bodyText}>{question.questionBody}</Text>
          <View style={styles.metaDataContainer}>
            <Text style={styles.metaLabel}>طرح في:</Text>
            <Text style={styles.metaDate}>
              {formatDate(question.createdAt)}
            </Text>
          </View>
        </View>

        {/* --- Existing Answer Section --- */}
        {question.answerBody && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>الإجابة</Text>
            <View style={styles.answeredBox}>
              <Text style={styles.bodyText}>{question.answerBody}</Text>
            </View>
            <View style={styles.metaDataContainer}>
              <Text style={styles.metaLabel}>تم الرد في:</Text>
              <Text style={styles.metaDate}>
                {formatDate(question.answeredAt)}
              </Text>
            </View>
          </View>
        )}

        {/* --- Answer Input Section --- */}
        {!question.answerBody && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>أضف إجابتك</Text>
            <TextAreaInput
              value={answer}
              onChangeText={setAnswer}
              placeholder="اكتب إجابتك هنا..."
            />
          </View>
        )}

        {/* --- Submit Button --- */}
        {!question.answerBody && (
          <View style={styles.buttonContainer}>
            <MainButton
              title={isLoading ? "جاري الإرسال..." : "إرسال الإجابة"}
              onPress={handleSubmit}
              loading={isLoading}
              disabled={!answer.trim() || isLoading}
            />
          </View>
        )}

        {/* --- "Answer is Helpful" Feedback --- */}
        {question.isAnswerHelpful && question.client && (
          <View style={styles.helpfulFeedbackCard}>
            {/* Optional Icon:
            <Icon
              name="check-circle-outline" // Example icon
              size={20}
              color={Colors.successDark || Colors.success || '#2F855A'}
              style={styles.helpfulIcon}
            /> */}
            <Text style={styles.helpfulFeedbackText}>
              وجد {question.client.firstName} {question.client.lastName} هذه
              الإجابة مفيدة.
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
    backgroundColor: Colors.background || "#F4F7FC",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32, // Ensure enough space at the bottom
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    ...(font.title || { fontSize: 20, fontWeight: "bold" }),
    color: Colors.mainColor || "#1A202C", // Use a primary or strong text color
    textAlign: "right",
    marginBottom: 12,
  },
  bodyText: {
    ...(font.body || { fontSize: 16 }),
    color: Colors.SecondaryColor || "#2D3748",
    lineHeight: 24,
    textAlign: "right",
    marginBottom: 10,
  },
  answeredBox: {
    // Special styling for the displayed answer text block
    backgroundColor: Colors.background || "#F4F7FC", // Slightly different background
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  metaDataContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200 || "#E2E8F0",
  },
  metaLabel: {
    ...(font.subtitle || { fontSize: 14, fontWeight: "600" }),
    color: Colors.SecondaryColor || "#4A5568",
    textAlign: "right",
  },
  metaDate: {
    ...(font.Caption || { fontSize: 14 }),
    color: Colors.SecondaryColor || "#718096",
    textAlign: "left", // Date is usually LTR, even in RTL context for numbers
  },
  // textAreaStyle: { // Example if you need to pass styles to TextAreaInput
  //   minHeight: 120,
  //   // ... other styles
  // },
  buttonContainer: {
    borderRadius: 8,
    height: 50,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    // If MainButton is not full-width and you want to center it:
    // alignItems: 'center',
  },
  // loaderAccessory: { // If MainButton does NOT have its own loader
  //   marginLeft: 10, // Or some other style to position it correctly
  // },
  helpfulFeedbackCard: {
    backgroundColor: "#E6FFFA",
    borderColor: "#38A169",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  helpfulIcon: {
    // Icon is visually on the right due to row-reverse
    // marginRight: 10, // This would be visual left
  },
  helpfulFeedbackText: {
    ...(font.body || { fontSize: 15 }),
    color: "#2F855A",
    flex: 1,
    textAlign: "right",
    marginLeft: 8, // If icon is present, space between icon and text
  },
});
