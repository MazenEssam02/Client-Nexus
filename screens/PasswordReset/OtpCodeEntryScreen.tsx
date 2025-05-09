import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { MainButton } from "../../components/Buttons/MainButton";
import { OtpCodeIllustration } from "../../components/Icons/OtpCodeIllustration";
import { useNavigation } from "@react-navigation/native";

export const OtpCodeEntryScreen = ({ route }) => {
  const navigator = useNavigation<AuthNavigationType>();
  const { emailOrPhone } = route.params;
  // We'll store 6 digits in an array
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // We'll hold refs for each input to auto-focus next
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

  const handleDigitChange = (text, index) => {
    // Only keep last character (1 digit)
    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);

    // Auto-focus next input if user typed a digit
    if (text && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join("");
    console.log("Code entered:", enteredCode);
    navigator.navigate("NewPassword", {
      emailOrPhone,
      code: enteredCode,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Illustration */}
        <OtpCodeIllustration style={styles.illustration} />

        {/* Heading Text */}
        <Text style={styles.heading}>
          ادخل الرمز الذي قمنا بإرساله الي رقم الهاتف المسجل لدينا
        </Text>

        {/* Code Input Fields */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.codeBox}
              value={digit}
              onChangeText={(text) => handleDigitChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              returnKeyType="next"
            />
          ))}
        </View>

        {/* Verify Button */}
        <View style={styles.buttonContainer}>
          <MainButton
            title="ادخل رمز التحقق"
            onPress={handleVerify}
            disabled={code.includes("")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  illustration: {
    marginTop: 50,
    marginBottom: 20,
    width: 200,
    height: 160,
  },
  heading: {
    ...font.headline,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 32,
  },
  codeBox: {
    width: 40,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.SecondaryColorLight,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 2,
  },
  buttonContainer: {
    width: "100%",
    height: 36,
    marginBottom: 20,
  },
});
