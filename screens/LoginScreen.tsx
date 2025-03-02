import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { font } from "../constants/Font";
import { Colors } from "../constants/Color";
import { GoogleLogo } from "../components/Icons/GoogleLogo";
import { AppleLogo } from "../components/Icons/AppleLogo";
import { FacebookLogo } from "../components/Icons/FacebookLogo";
import { LoginInput } from "../components/LoginInput/LoginInput";
import { MainButton } from "../components/Buttons/MainButton";
import { SocialLogin } from "../components/SocialLogin/SocialLogin";
import { useAuthStore } from "../store/auth";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { LoginIllustration } from "../components/Icons/LoginIllustration";

const LoginScreen = () => {
  const { login } = useAuthStore();
  const navigation = useNavigation<AuthNavigationType>();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LoginIllustration style={styles.illustration} />

        <Text style={styles.title}>تسجيل الدخول</Text>

        <Controller
          control={control}
          name="email"
          rules={{
            required: "البريد الإلكتروني مطلوب",
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
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "كلمة السر مطلوبة",
            minLength: {
              value: 8,
              message: "كلمة السر يجب أن تحتوي على 8 أحرف على الأقل",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <LoginInput
              placeholder="كلمة السر"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
              placeholderTextColor={Colors.gray500}
            />
          )}
        />

        <TouchableOpacity
          style={styles.alignLeft}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.forgotText}>نسيت كلمة السر؟</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          ليس لديك حساب؟{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("Register")}
          >
            سجل هنا
          </Text>
        </Text>

        <View style={styles.buttonContainer}>
          <MainButton
            title="تسجيل دخول"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </View>

        <SocialLogin onPress={(authSource) => login({ social: authSource })} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingBottom: 40, // Extra bottom padding for scroll space
  },
  illustration: {
    marginTop: 50,
    marginBottom: 38,
  },
  title: {
    ...font.headline,
    marginBottom: 15,
    alignSelf: "flex-end",
  },
  alignLeft: {
    alignSelf: "flex-start",
  },
  forgotText: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 4,
    ...font.subtitle,
  },
  signupText: {
    ...font.subtitle,
    alignSelf: "flex-end",
    marginBottom: 28,
  },
  signupLink: {
    color: Colors.SecondaryColor,
  },
  buttonContainer: {
    width: "100%",
    height: 36,
    marginBottom: 20,
  },
});
