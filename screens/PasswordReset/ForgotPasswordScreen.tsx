import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { LoginInput } from "../../components/LoginInput/LoginInput";
import { MainButton } from "../../components/Buttons/MainButton";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { VerificationIllustration } from "../../components/Icons/VerificationIllustration";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { apiClient } from "../../API/https";

export const ForgotPasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigator = useNavigation<AuthNavigationType>();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      emailOrPhone: "",
    },
    mode: "onChange",
  });

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
        <VerificationIllustration style={styles.illustration} />

        {/* Heading Text */}
        <Text style={styles.heading}>
          لا تقلق ، ما عليك سوى كتابة البريد الإلكتروني وسنرسل لك رمز التحقق
        </Text>

        {/* Phone Input */}
        <Controller
          control={control}
          name="emailOrPhone"
          rules={{
            required: "البريد الإلكتروني أو رقم الهاتف مطلوب",
            pattern: {
              value:
                /^([0-9]{11})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/i,
              message: "معذراً البريد غير صحيح!",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <LoginInput
              placeholder="البريد الإلكتروني او رقم الهاتف"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              placeholderTextColor={Colors.gray500}
              error={errors.emailOrPhone?.message}
            />
          )}
        />

        {/* Send Code Button */}
        <View style={styles.buttonContainer}>
          <MainButton
            title="ارسل رمز التحقق"
            onPress={handleSubmit(({ emailOrPhone }) => {
              setIsLoading(true);
              setError(null);
              apiClient
                .post("/api/PasswordReset/send-otp", {
                  email: emailOrPhone,
                })
                .then(() => {
                  setIsLoading(false);
                  navigator.navigate("OtpCodeEntry", {
                    emailOrPhone,
                  });
                })
                .catch((err) => {
                  setIsLoading(false);
                  setError("حدث خطأ ما ، حاول مرة أخرى لاحقاً");
                  console.warn(
                    "Error sending OTP:",
                    JSON.stringify(err, null, 2)
                  );
                });
            })}
            disabled={!isValid || isLoading}
            loading={isLoading}
          />
          {error && (
            <Text
              style={{
                color: Colors.invalidColor200,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {error}
            </Text>
          )}
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
    width: 220, // Adjust if needed
    height: 160, // Adjust if needed
  },
  heading: {
    ...font.headline, // or whichever style you use for headings
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    height: 36,
    marginBottom: 20,
  },
});
