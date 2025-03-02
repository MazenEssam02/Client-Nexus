import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { LoginInput } from "../components/LoginInput/LoginInput";
import { MainButton } from "../components/Buttons/MainButton";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { NewPasswordIllustration } from "../components/Icons/NewPasswordIllustration";

export const NewPasswordScreen = () => {
  const navigator = useNavigation<AuthNavigationType>();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const passwordValue = watch("password");

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
        <NewPasswordIllustration style={styles.illustration} />

        {/* Heading Text */}
        <Text style={styles.heading}>من فضلك قم بكتابة كلمة سر جديدة</Text>

        {/* Password */}
        <Controller
          control={control}
          name="password"
          rules={{
            required: "كلمة السر مطلوبة",
            minLength: {
              value: 8,
              message: "يجب أن تحتوي كلمة السر على 8 أحرف على الأقل",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <LoginInput
              placeholder="كلمة السر"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              placeholderTextColor={Colors.gray500}
              error={errors.password?.message}
            />
          )}
        />

        {/* Confirm Password */}
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "تأكيد كلمة السر مطلوب",
            validate: (val) => val === passwordValue || "كلمة السر غير متطابقة",
          }}
          render={({ field: { onChange, value } }) => (
            <LoginInput
              placeholder="تأكيد كلمة السر"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              placeholderTextColor={Colors.gray500}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        {/* Send Code Button */}
        <View style={styles.buttonContainer}>
          <MainButton
            title="ارسل رمز التحقق"
            onPress={handleSubmit(() => navigator.navigate("Login"))}
            disabled={!isValid}
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
