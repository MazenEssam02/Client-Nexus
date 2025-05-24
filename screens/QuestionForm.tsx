import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { font } from "../constants/Font";
import { Colors } from "../constants/Color";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { Client } from "../API/https";

const QuestionForm = () => {
  const [emptyError, setError] = useState("");
  const [question, setQuestion] = useState("");
  const {
    mutate: submitQuestion,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: Client.submitQA,
    onSuccess: () => {
      Alert.alert("تم ارسال السؤال بنجاح");
    },
    onError: (err) => {
      Alert.alert("حدث خطأ ما برجاء المحاولة مره اخري");
      console.log(err);
    },
  });
  const navigation = useNavigation();
  const validateAndSubmit = () => {
    if (question.trim() === "") {
      setError("يرجى إدخال سؤالك");
      return;
    }
    setError("");
    submitQuestion(question);
    navigation.navigate("MyQuestion" as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>السؤال</Text>
        <Text style={styles.subLabel}>(لن يتم الافصاح عن هويتك)</Text>
      </View>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="سؤالك"
        multiline
        value={question}
        onChangeText={setQuestion}
      />
      {error ? <Text style={styles.errorText}>{emptyError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={validateAndSubmit}>
        <Text style={styles.buttonText}>إرسال السؤال</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    justifyContent: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
    color: Colors.SecondaryColor,
  },
  subLabel: {
    fontSize: font.subtitle.fontSize,
    fontFamily: font.subtitle.fontFamily,
    color: Colors.SecondaryColor,
    alignSelf: "center",
    marginRight: 3,
    marginTop: 3,
  },
  input: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#6B3F1E",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
    textAlign: "right",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  button: {
    marginTop: 100,
    alignSelf: "center",
    backgroundColor: Colors.mainColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "50%",
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: font.Button.fontSize,
    fontFamily: font.Button.fontFamily,
  },
});

export default QuestionForm;
