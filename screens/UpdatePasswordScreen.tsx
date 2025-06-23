import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MainButton } from "../components/Buttons/MainButton";
import { LabeledInput } from "../components/AddressListModal/LabeledInput";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { useNavigation } from "@react-navigation/native";
import { apiClient } from "../API/https";
import ScreensWrapper from "./ScreensWrapper/ScreensWrapper";
import { useAuthStore } from "../store/auth";

export default function UpdatePasswordScreen() {
  const { logout, user } = useAuthStore();
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentPassword) {
      newErrors.currentPassword = "الحقل مطلوب";
    }
    if (!newPassword) {
      newErrors.newPassword = "الحقل مطلوب";
    } else if (newPassword.length < 8) {
      newErrors.newPassword =
        "يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      await apiClient.put(
        `/api/${
          user.type === "lawyer" ? "ServiceProvider" : "Client"
        }/update-password`,
        {
          currentPassword,
          newPassword,
        }
      );

      Alert.alert("نجاح", "تم تحديث كلمة المرور بنجاح.");
      logout(); // Log out the user after password change
    } catch (error: any) {
      console.error("Error updating password:", JSON.stringify(error, null, 2));
      const errorMessage =
        error.response?.data?.message ||
        "فشل تحديث كلمة المرور. يرجى التحقق من كلمة المرور الحالية والمحاولة مرة أخرى.";
      Alert.alert("خطأ", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreensWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>تغيير كلمة المرور</Text>

            <LabeledInput
              label="كلمة المرور الحالية"
              placeholder="أدخل كلمة المرور الحالية"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              error={errors.currentPassword}
            />

            <LabeledInput
              label="كلمة المرور الجديدة"
              placeholder="أدخل كلمة المرور الجديدة"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              error={errors.newPassword}
            />

            <LabeledInput
              label="تأكيد كلمة المرور الجديدة"
              placeholder="أعد إدخال كلمة المرور الجديدة"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={errors.confirmPassword}
            />

            <View style={styles.buttonContainer}>
              <MainButton
                title="حفظ التغييرات"
                onPress={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreensWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    justifyContent: "center",
    padding: 10,
  },
  formContainer: {},
  title: {
    ...font.title,
    textAlign: "right",
    marginBottom: 25,
  },
  buttonContainer: {
    marginTop: 20,
    height: 50,
  },
});
