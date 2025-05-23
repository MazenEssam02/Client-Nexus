import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { MainButton } from "../components/Buttons/MainButton";
import { SocialLogin } from "../components/SocialLogin/SocialLogin";
import { LoginInput } from "../components/LoginInput/LoginInput";
import { LawyerIcon } from "../components/Icons/LawyerIcon";
import { UserIcon } from "../components/Icons/UserIcon";
import { RegisterIllustration } from "../components/Icons/RegisterIllustration";
import DatePickerInput from "../components/DatePickerInput/DatePickerInput";
import { GenderPicker } from "../components/GenderPicker/GenderPicker";
import CheckBox from "react-native-check-box";
import { useNavigation } from "@react-navigation/native";
import { PrivacyPolicyModal } from "../components/PrivacyPolicyModal/PrivacyPolicyModal";
import { apiClient } from "../API/https";
import {
  FileUploadButton,
  SelectedAsset,
} from "../components/FileUploadButton/FileUploadButton";
import { useAuthStore } from "../store/auth";

type FormData = {
  fullName: string;
  email: string;
  birthdate: Date | null;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: boolean;
};

const RegisterScreen = () => {
  const { register } = useAuthStore();
  const navigation = useNavigation<AuthNavigationType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // For role selection: 'client' or 'lawyer'
  const [selectedRole, setSelectedRole] = useState<"lawyer" | "client">(
    "client"
  );
  const [profilePic, setProfilePic] = useState<SelectedAsset | null>(null);

  // For accepting Terms & Privacy
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      birthdate: null,
      phone: "",
      password: "",
      confirmPassword: "",
      gender: true, // true for male, false for female
    },
    mode: "onChange",
  });

  // Watch password to compare with confirm password
  const passwordValue = watch("password");

  const onSubmit = async (data: FormData) => {
    if (!acceptedPolicy) {
      alert("الرجاء الموافقة على سياسة الاستخدام والخصوصية أولاً");
      return;
    }
    if (selectedRole === "lawyer") {
      return;
    }
    setIsLoading(true);
    setError(null);
    console.log("Registering user", data);
    register({
      firstName: data.fullName.split(" ")[0],
      lastName: data.fullName.split(" ").slice(1).join(" "),
      email: data.email,
      role: selectedRole,
      birthDate: data.birthdate?.toISOString().split("T")[0] || "",
      phoneNumber: data.phone,
      password: data.password,
      gender: data.gender,
      mainImage: profilePic,
    })
      .then(() => {
        console.log("Registration successful");
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn("Registration error", err.response);
        setIsLoading(false);
        setError(err.response.data.message || "حدث خطأ أثناء التسجيل");
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
        {__DEV__ && (
          // button to fill the form with test data
          <TouchableOpacity
            onPress={() => {
              setValue("fullName", "John Doe");
              setValue("email", "john.doe@gmail.com");
              setValue("birthdate", new Date("1990-01-01"));
              setValue("phone", "01090909090");
              setValue("password", "password123");
              setValue("confirmPassword", "password123");
              setValue("gender", false);
            }}
            style={{
              backgroundColor: Colors.mainColor,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#fff" }}>ملئ البيانات التجريبية</Text>
          </TouchableOpacity>
        )}
        {/* Illustration */}
        <RegisterIllustration style={styles.illustration} />

        {/* Title */}
        <Text style={styles.title}>انضم إلينا الآن</Text>

        {/* Role Selection */}
        <View style={styles.rolesContainer}>
          <TouchableOpacity onPress={() => setSelectedRole("lawyer")}>
            <View style={[styles.roleContainer]}>
              <View
                style={[
                  styles.roleBox,
                  selectedRole === "lawyer" && styles.selectedRoleBox,
                ]}
              >
                <LawyerIcon
                  color={selectedRole === "lawyer" ? "#fff" : "#000"}
                />
              </View>
              <Text style={[styles.roleText]}>محامي</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedRole("client")}>
            <View style={[styles.roleContainer]}>
              <View
                style={[
                  styles.roleBox,
                  selectedRole === "client" && styles.selectedRoleBox,
                ]}
              >
                <UserIcon />
              </View>
              <Text style={[styles.roleText]}>عميل</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Username or Phone */}
        <Controller
          control={control}
          name="fullName"
          rules={{
            required: "مطلوب اسم المستخدم الكامل",
            minLength: {
              value: 3,
              message: "اسم المستخدم الكامل يجب أن يكون 3 أحرف على الأقل",
            },
            maxLength: {
              value: 50,
              message: "اسم المستخدم الكامل يجب أن يكون أقل من 50 حرف",
            },
            validate: (value) =>
              value.trim().split(" ").length > 1 ||
              "اسم المستخدم الكامل يجب أن يحتوي على اسمين على الأقل",
          }}
          render={({ field: { onChange, value } }) => (
            <LoginInput
              placeholder="اسم المستخدم الكامل"
              value={value}
              onChangeText={onChange}
              error={errors.fullName?.message}
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

        <Controller
          control={control}
          name="birthdate"
          rules={{ required: "تاريخ الميلاد مطلوب" }}
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              date={value}
              onDateChange={onChange}
              placeholder="تاريخ الميلاد"
            />
          )}
        />

        {/* Phone */}
        <Controller
          control={control}
          name="phone"
          rules={{
            required: "رقم الهاتف مطلوب",
            pattern: {
              value: /^(\+?\d{1,3}[- ]?)?\d{10}$/,
              message: "معذرةً الرقم غير صحيح!",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <LoginInput
              placeholder="رقم الهاتف"
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
              placeholderTextColor={Colors.gray500}
              error={errors.phone?.message}
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
          <Text style={styles.genderLabel}>النوع</Text>
          <Controller
            control={control}
            name="gender"
            rules={{ required: "الرجاء اختيار النوع" }}
            render={({ field: { onChange, value } }) => {
              return <GenderPicker value={value} onChange={onChange} />;
            }}
          />
        </View>
        <FileUploadButton
          label="صورة الحساب:"
          onFileSelected={(asset) => setProfilePic(asset)}
          selectedFileName={profilePic?.name}
        />

        {/* Terms & Privacy Checkbox */}
        <View style={styles.termsContainer}>
          <CheckBox
            onClick={() => setAcceptedPolicy(!acceptedPolicy)}
            isChecked={acceptedPolicy}
            style={styles.checkbox}
            checkBoxColor={Colors.mainColor}
          />
          <View style={styles.termsTextContainer}>
            <Text style={styles.termsText}>أنا موافق على </Text>
            {/* Tap to open modal */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={[styles.termsText, { color: Colors.mainColor }]}>
                سياسة الاستخدام والخصوصية
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Register Button */}
        <View style={styles.buttonContainer}>
          <MainButton
            title="إنشاء حساب جديد"
            onPress={handleSubmit(onSubmit)}
            disabled={!(isValid && acceptedPolicy) || isLoading}
          />
        </View>

        {error && <Text style={{ color: "red" }}>{error}</Text>}

        <SocialLogin
          onPress={(authSource) =>
            console.log("Attempt to login with social Not Iplemeneted")
          }
        />

        {/* Already have account? */}
        <TouchableOpacity
          style={{ marginTop: 16 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>
            لديك حساب؟ <Text style={styles.loginLink}>تسجيل دخول</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <PrivacyPolicyModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
    paddingBottom: 40,
    minHeight: "100%",
  },
  illustration: {
    marginTop: 50,
    marginBottom: 30,
    width: 200,
    height: 140,
  },
  title: {
    ...font.headline,
    marginBottom: 20,
  },
  rolesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    width: "100%",
  },
  roleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  roleBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
  },
  selectedRoleBox: {
    backgroundColor: Colors.mainColor,
  },
  roleText: {
    marginTop: 4,
    color: Colors.SecondaryColor,
    ...font.subtitle,
  },
  genderContainer: {
    width: "100%",
    marginBottom: 8,
  },
  genderLabel: {
    ...font.subtitle,
    lineHeight: 22,
    marginBottom: 8,
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
    lineHeight: 22,
    textAlign: "right",
  },
  buttonContainer: {
    width: "100%",
    height: 36,
    marginBottom: 20,
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
  termsTextContainer: {
    flexDirection: "row-reverse",
    gap: 2,
    flex: 1,
  },
});
