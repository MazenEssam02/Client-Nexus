import React, { useState } from "react";
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

if (!I18nManager.isRTL) {
  I18nManager.forceRTL(true);
}

export default function QuestionResponseScreen({ route }) {
  const question = route.params;
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    console.log("Answer submitted:", answer);
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
        </View>

        <View style={styles.answerSection}>
          <Text style={styles.label}>الاجابة</Text>
          <TextAreaInput
            value={answer}
            onChangeText={setAnswer}
            placeholder="اكتب إجابتك هنا..."
          />
        </View>

        <View style={{ height: 50 }}>
          <MainButton
            title="إرسال الإجابة"
            onPress={handleSubmit}
            disabled={!answer}
          />
        </View>
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
});
