import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Switch,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { MainButton } from "../components/Buttons/MainButton";
import { SocialLogin } from "../components/SocialLogin/SocialLogin";
import { LoginInput } from "../components/LoginInput/LoginInput";
import { useAuthStore } from "../store/auth";
import { LawyerIcon } from "../components/Icons/LawyerIcon";
import { UserIcon } from "../components/Icons/UserIcon";
import { RegisterIllustration } from "../components/Icons/RegisterIllustration";

const RegisterScreen = () => {
  const { login } = useAuthStore();

  // For role selection: 'client' or 'lawyer'
  const [selectedRole, setSelectedRole] = useState("client");

  // For accepting Terms & Privacy
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  // For gender selection
  const [isMale, setIsMale] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      usernameOrPhone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // Watch password to compare with confirm password
  const passwordValue = watch("password");

  const onSubmit = (data) => {
    if (!acceptedPolicy) {
      alert("الرجاء الموافقة على سياسة الاستخدام والخصوصية أولاً");
      return;
    }
    // Example call to your store
    login({
      // username: data.usernameOrPhone,
      email: data.email,
      password: data.password,
      // role: selectedRole,
      // gender: isMale ? "male" : "female",
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Illustration */}
        <RegisterIllustration style={styles.illustration} />

        {/* Title */}
        <Text style={styles.title}>انضم إلينا الآن</Text>

        {/* Role Selection */}
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleBox,
              selectedRole === "client" && styles.selectedRoleBox,
            ]}
            onPress={() => setSelectedRole("client")}
          >
            <UserIcon
              color={
                selectedRole === "client" ? Colors.mainColor : Colors.gray500
              }
            />
            <Text
              style={[
                styles.roleText,
                selectedRole === "client" && styles.selectedRoleText,
              ]}
            >
              عميل
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleBox,
              selectedRole === "lawyer" && styles.selectedRoleBox,
            ]}
            onPress={() => setSelectedRole("lawyer")}
          >
            <LawyerIcon
              color={
                selectedRole === "lawyer" ? Colors.mainColor : Colors.gray500
              }
            />
            <Text
              style={[
                styles.roleText,
                selectedRole === "lawyer" && styles.selectedRoleText,
              ]}
            >
              محامي
            </Text>
          </TouchableOpacity>
        </View>

        {/* Username or Phone */}
        <Controller
          control={control}
          name="usernameOrPhone"
          rules={{
            required: "مطلوب اسم المستخدم أو رقم الهاتف",
          }}
          render={({ field: { onChange, value } }) => (
            <LoginInput
              placeholder="اسم المستخدم أو رقم الهاتف"
              value={value}
              onChangeText={onChange}
              error={errors.usernameOrPhone?.message}
              placeholderTextColor={Colors.gray500}
            />
          )}
        />

        {/* Email */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: "البريد الإلكتروني مطلوب",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "معذراً البريد غير صحيح!",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <LoginInput
              placeholder="البريد الإلكتروني"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              placeholderTextColor={Colors.gray500}
              error={errors.email?.message}
            />
          )}
        />

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

        {/* Gender */}
        <View style={styles.genderContainer}>
          <Text style={styles.genderLabel}>الجنس</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.genderText}>ذكر</Text>
            <Switch
              trackColor={{ false: "#ccc", true: Colors.SecondaryColorLight }}
              thumbColor={isMale ? Colors.SecondaryColor : "#f4f3f4"}
              onValueChange={() => setIsMale(!isMale)}
              value={!isMale} // If switch is ON, it means female
              style={{ marginHorizontal: 10 }}
            />
            <Text style={styles.genderText}>أنثى</Text>
          </View>
        </View>

        {/* Terms & Privacy Checkbox */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAcceptedPolicy(!acceptedPolicy)}
          >
            {/* <Icon
              name={acceptedPolicy ? "checkbox" : "square-outline"}
              size={24}
              color={acceptedPolicy ? Colors.SecondaryColor : Colors.gray500}
            /> */}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            أنا موافق على سياسة الاستخدام والخصوصية
          </Text>
        </View>

        {/* Register Button */}
        <View style={styles.buttonContainer}>
          <MainButton
            title="إنشاء حساب جديد"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </View>

        {/* Or use social */}
        <Text style={styles.orText}>أو سجل باستخدام</Text>
        <SocialLogin onPress={(authSource) => login({ social: authSource })} />

        {/* Already have account? */}
        <TouchableOpacity style={{ marginTop: 16 }}>
          <Text style={styles.loginText}>
            لديك حساب؟ <Text style={styles.loginLink}>تسجيل دخول</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingBottom: 40,
  },
  illustration: {
    marginTop: 50,
    marginBottom: 20,
    width: 200,
    height: 140,
  },
  title: {
    ...font.headline,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    width: "100%",
  },
  roleBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: 12,
    width: 90,
    height: 70,
    backgroundColor: "#fff",
  },
  selectedRoleBox: {
    backgroundColor: Colors.SecondaryColor,
    borderColor: Colors.SecondaryColor,
  },
  roleText: {
    marginTop: 4,
    color: Colors.gray500,
    ...font.subtitle,
  },
  selectedRoleText: {
    color: "#fff",
  },
  genderContainer: {
    width: "100%",
    marginBottom: 16,
  },
  genderLabel: {
    ...font.subtitle,
    marginBottom: 4,
    alignSelf: "flex-end",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  genderText: {
    ...font.subtitle,
    fontSize: 14,
  },
  termsContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginVertical: 16,
    width: "100%",
  },
  checkbox: {
    marginHorizontal: 8,
  },
  termsText: {
    ...font.subtitle,
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  orText: {
    marginVertical: 16,
    ...font.subtitle,
  },
  loginText: {
    ...font.subtitle,
  },
  loginLink: {
    color: Colors.SecondaryColor,
    ...font.subtitle,
  },
});
