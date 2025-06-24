import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Controller, useForm, SubmitHandler, set } from "react-hook-form";

import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import { MainButton } from "../../components/Buttons/MainButton";
import { TextAreaInput } from "../../components/TextAreaInput/TextAreaInput";
import { RadioButtonGroup } from "../../components/RadioButton/RadioButtonGroup";
import {
  FileUploadButton,
  SelectedAsset,
} from "../../components/FileUploadButton/FileUploadButton";
import {
  Address,
  AddressListModal,
} from "../../components/AddressListModal/AddressListModal";
import { LoginIllustration } from "../../components/Icons/LoginIllustration";
import { LoginInput } from "../../components/LoginInput/LoginInput";
import { apiClient, ServiceProvider } from "../../API/https";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Dropdown from "react-native-input-select";
import { useAuthStore } from "../../store/auth";
import { GenderPicker } from "../../components/GenderPicker/GenderPicker";
import DatePickerInput from "../../components/DatePickerInput/DatePickerInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import IsError from "../../components/IsError/IsError";

interface LawyerRegisterFormData {
  fullName: string;
  email: string;
  birthdate: Date;
  phone: string;
  yearsOfExperience: string;
  officeConsultationPrice: string;
  phoneConsultationPrice: string;
  details: string;
}

const LawyerEditScreen = ({ route, navigation }) => {
  const queryClient = useQueryClient();
  const { user, error, updateUser } = useAuthStore();
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["LawyerDashboard"],
    queryFn: () => ServiceProvider.getById(user.id),
  });
  const [isLoadingChange, setIsLoadingChange] = useState<boolean>(false);

  const [isAddressModalVisible, setIsAddressModalVisible] =
    useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm<LawyerRegisterFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      birthdate: null, // Default date, can be changed
      phone: "",
      yearsOfExperience: "",
      details: "",
      officeConsultationPrice: "",
      phoneConsultationPrice: "",
    },
    mode: "onChange",
  });
  const [profilePic, setProfilePic] = useState<SelectedAsset | null>(null);

  const handleFormSubmit: SubmitHandler<LawyerRegisterFormData> = async (
    data
  ) => {
    console.log("Registering user", data);
    const formData = new FormData();
    formData.append("FirstName", data.fullName.split(" ")[0]);
    formData.append("LastName", data.fullName.split(" ")[1] || "");
    formData.append("Email", data.email);
    formData.append("PhoneNumber", data.phone);
    formData.append(
      "BirthDate",
      data.birthdate?.toISOString().split("T")[0] || ""
    );
    formData.append("YearsOfExperience", data.yearsOfExperience);
    formData.append("Office_consultation_price", data.officeConsultationPrice);
    formData.append(
      "Telephone_consultation_price",
      data.phoneConsultationPrice
    );
    formData.append("Description", data.details);
    console.log("Addresses:", addresses);
    addresses?.forEach((address, i) => {
      Object.entries(address).forEach(([key, value]) => {
        formData.append(`Addresses[${i}][${key}]`, `${value}`);
      });
    });
    if (profilePic) {
      formData.append("MainImage", profilePic as any);
    }
    try {
      setIsLoadingChange(true);
      const response = await apiClient.put(`/api/ServiceProvider`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      updateUser({
        ...user,
        firstName: data.fullName.split(" ")[0],
        lastName: data.fullName.split(" ")[1] || "",
        email: data.email,
        phoneNumber: data.phone,
        birthDate: data.birthdate.toISOString().split("T")[0],
        mainImage: profilePic ? profilePic.uri : user.mainImage,
      });
      console.log("User updated successfully", response.data);
      Alert.alert("نجاح", "تم تحديث بيانات المحامي بنجاح");
      queryClient.invalidateQueries({ queryKey: ["LawyerDashboard"] });
      setIsLoadingChange(false);
      navigation.goBack();
    } catch (error) {
      console.error(
        "Error response:",
        JSON.stringify(error.response.data, null, 2)
      );
      if (error.response?.data?.message) {
        Alert.alert("خطأ", error.response.data.message);
      }
      Alert.alert(
        "خطأ",
        "حدث خطأ أثناء تحديث بيانات المحامي. يرجى المحاولة مرة أخرى."
      );
      setIsLoadingChange(false);
    }
  };

  const handleRemoveAddress = (addressId: string) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== addressId)
    );
  };

  const handleAddNewAddressFromModal = (newAddress: Address) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };

  useEffect(() => {
    if (userData?.data?.data) {
      const lawyerData = userData.data.data;
      setValue("fullName", lawyerData.firstName + " " + lawyerData.lastName);
      setValue("email", user.email);
      setValue("birthdate", new Date(lawyerData.birthDate));
      setValue("phone", lawyerData.phonenumber);
      setValue("yearsOfExperience", lawyerData.yearsOfExperience.toString());
      setValue(
        "officeConsultationPrice",
        lawyerData.office_consultation_price.toString()
      );
      setValue(
        "phoneConsultationPrice",
        lawyerData.telephone_consultation_price.toString()
      );
      setValue("details", lawyerData.description || "");
    }
  }, [userData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <IsError error={error} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>أدخل معلومات المحامي</Text>

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

        <View style={styles.addAddressButtonContainer}>
          <MainButton
            title="إضافة عنوان"
            onPress={() => setIsAddressModalVisible(true)}
          />
        </View>

        <Controller
          control={control}
          name="yearsOfExperience"
          rules={{
            required: "سنوات الخبرة مطلوبة",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "سنوات الخبرة يجب أن تكون رقم صحيح أكبر من 0",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LoginInput
              placeholder="سنوات الخبرة"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              error={errors.yearsOfExperience?.message}
              placeholderTextColor={Colors.gray700}
            />
          )}
        />
        <Controller
          control={control}
          name="officeConsultationPrice"
          rules={{
            required: "سعر الاستشارة في المكتب مطلوب",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "سعر الاستشارة يجب أن يكون رقم صحيح أكبر من 0",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LoginInput
              placeholder="سعر الاستشارة في المكتب"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              error={errors.officeConsultationPrice?.message}
              placeholderTextColor={Colors.gray700}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneConsultationPrice"
          rules={{
            required: "سعر الاستشارة عبر الهاتف مطلوب",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "سعر الاستشارة يجب أن يكون رقم صحيح أكبر من 0",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LoginInput
              placeholder="سعر الاستشارة عبر الهاتف"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
              error={errors.phoneConsultationPrice?.message}
              placeholderTextColor={Colors.gray700}
            />
          )}
        />

        <Controller
          control={control}
          name="details"
          rules={{
            required: "التفاصيل مطلوبة",
            minLength: {
              value: 20,
              message: "التفاصيل يجب أن تكون 20 حرف على الأقل",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextAreaInput
              placeholder="تفاصيل عنك / الدرجات الاكاديمية"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.details?.message}
              numberOfLines={5}
            />
          )}
        />
        <FileUploadButton
          label="صورة الحساب:"
          onFileSelected={(setFile) => {
            setProfilePic(setFile);
          }}
          selectedFileName={profilePic?.name}
        />

        <View style={styles.mainButtonSaveContainer}>
          <MainButton
            title="حفظ البيانات"
            loading={isLoadingChange}
            onPress={handleSubmit(handleFormSubmit)}
          />
          {error && (
            <Text
              style={{
                color: Colors.invalidColor600,
                alignSelf: "center",
                ...font.subtitle,
              }}
            >
              {error}
            </Text>
          )}
        </View>
      </ScrollView>

      <AddressListModal
        isVisible={isAddressModalVisible}
        onClose={() => setIsAddressModalVisible(false)}
        addresses={addresses}
        onRemoveAddress={handleRemoveAddress}
        onAddressAdded={handleAddNewAddressFromModal} // Pass the new handler
      />
    </KeyboardAvoidingView>
  );
};

export default LawyerEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
    backgroundColor: Colors.background,
  },
  illustration: {
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? 10 : 20,
    marginBottom: 25,
  },
  title: {
    ...font.headline,
    color: Colors.SecondaryColor,
    fontSize: 22,
    marginBottom: 25,
    alignSelf: "flex-end",
  },
  addAddressButtonContainer: {
    width: "100%",
    height: 36,
    maxWidth: 200,
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: 5,
  },
  addSpecButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.mainColorLight || "#E8D5C4",
    borderRadius: 6,
    marginBottom: 10,
    marginTop: -5,
  },
  addSpecButtonTextContent: {
    ...(font.Button as object),
    fontSize: 13,
    color: Colors.mainColor || "#A0522D",
  },
  chipListContainer: {
    marginBottom: 15,
    alignSelf: "flex-end",
  },
  mainButtonSaveContainer: {
    width: "100%",
    height: 50,
    marginTop: 20,
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
});
