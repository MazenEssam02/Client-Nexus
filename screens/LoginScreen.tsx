import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { font } from "../constants/Font";
import { Colors } from "../constants/Color";
import { GoogleLogo } from "../components/Icons/GoogleLogo";
import { AppleLogo } from "../components/Icons/AppleLogo";
import { FacebookLogo } from "../components/Icons/FacebookLogo";
import { LoginInput } from "../components/LoginInput/LoginInput";
import { MainButton } from "../components/Buttons/MainButton";
import { SocialLogin } from "../components/SocialLogin/SocialLogin";
import { useAuthStore } from "../store/auth";

const LoginScreen = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Simple email validation function
  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text && !emailRegex.test(text)) {
      setEmailError("معذراً البريد غير صحيح!");
    } else {
      setEmailError("");
    }
  };
  const validatePassword = (text: string) => {
    setPassword(text);
    if (text && text.length < 8) {
      setPasswordError("كلمة السر يجب أن تحتوي على 8 أحرف على الأقل");
    } else {
      setPasswordError("");
    }
  };
  const isDisabled = email === "" || password === "" || emailError !== "";

  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/login-illustration.png")}
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text style={styles.title}>تسجيل الدخول</Text>

      <LoginInput
        placeholder="البريد الإلكتروني او رقم الهاتف"
        keyboardType="email-address"
        value={email}
        onChangeText={validateEmail}
        placeholderTextColor={Colors.gray500}
        error={emailError}
      />

      <LoginInput
        placeholder="كلمة السر"
        secureTextEntry
        value={password}
        onChangeText={validatePassword}
        error={passwordError}
        placeholderTextColor={Colors.gray500}
      />

      <TouchableOpacity style={styles.alignLeft}>
        <Text style={styles.forgotText}>نسيت كلمة السر؟</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        ليس لديك حساب؟ <Text style={styles.signupLink}>سجل هنا</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <MainButton
          title="تسجيل دخول"
          onPress={() => {
            login({
              email,
              password,
            });
          }}
          disabled={isDisabled}
        />
      </View>

      <SocialLogin onPress={(authSource) => login({ social: authSource })} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
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
