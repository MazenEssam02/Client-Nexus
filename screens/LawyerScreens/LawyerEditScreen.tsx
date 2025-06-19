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
import { apiClient } from "../../API/https";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "react-native-input-select";
import { useAuthStore } from "../../store/auth";
import { GenderPicker } from "../../components/GenderPicker/GenderPicker";
import DatePickerInput from "../../components/DatePickerInput/DatePickerInput";

interface LawyerRegisterFormData {
  fullName: string;
  email: string;
  birthdate: Date;
  phone: string;
  name: string;
  yearsOfExperience: string;
  officeConsultationPrice: string;
  phoneConsultationPrice: string;
  details: string;
  workType: "private" | "company";
}

const LawyerEditScreen = ({ route, navigation }) => {
  const { user, isLoading, error } = useAuthStore();
  const commonFormData = {
    firstName: "",
    lastName: "",
    email: "",
    role: "lawyer",
    birthDate: "",
    phoneNumber: "",
    password: "",
  } as {
    firstName: string;
    lastName: string;
    email: string;
    role: "lawyer";
    birthDate: string;
    phoneNumber: string;
    password: string;
    gender: boolean;
    mainImage: SelectedAsset | null;
  };

  const [idCardPic, setIdCardPic] = useState<SelectedAsset | null>(null);
  const [nationalIdPic, setNationalIdPic] = useState<SelectedAsset | null>(
    null
  );
  const { data: specializationsData } = useQuery<
    {
      id: number;
      name: string;
    }[]
  >({
    queryKey: ["specializations"],
    queryFn: () =>
      apiClient
        .get("/api/Specialization/GetAllSpecializations")
        .then((res) =>
          res.data.data.filter((item) => item.serviceProviderTypeId === 1)
        ),
  });
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    if (specializationsData && specializationsData.length > 0) {
      setSelectedSpecializations([specializationsData[0]]);
    }
  }, [specializationsData]);

  const [isAddressModalVisible, setIsAddressModalVisible] =
    useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      cityId: 1,
      detailedAddress: "عنوان 1",
      stateId: 1,
    },
  ]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm<LawyerRegisterFormData>({
    defaultValues: {
      fullName: user.firstName + " " + user.lastName,
      email: user.email,
      birthdate: new Date("2000-01-01"), // Default date, can be changed
      phone: "01093922530",
      name: "مكتب النجاح",
      yearsOfExperience: "5",
      details: "محامي متخصص في القضايا المدنية",
      workType: "private",
      officeConsultationPrice: "100",
      phoneConsultationPrice: "50",
    },
    mode: "onChange",
  });
  const watchedWorkType = watch("workType");

  const handleFormSubmit: SubmitHandler<LawyerRegisterFormData> = async (
    data
  ) => {
    console.log("Registering user", data);
    navigation.goBack();
  };

  const handleRemoveAddress = (addressId: string) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== addressId)
    );
  };

  const handleAddNewAddressFromModal = (newAddress: Address) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };
  const [isMale, setIsMale] = useState<boolean>(true);

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

        <Controller
          control={control}
          name="name"
          rules={{ required: "الاسم مطلوب" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LoginInput
              placeholder="الاسم"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.name?.message}
              placeholderTextColor={Colors.gray700}
            />
          )}
        />

        <View style={styles.addAddressButtonContainer}>
          <MainButton
            title="إضافة عنوان"
            onPress={() => setIsAddressModalVisible(true)}
          />
        </View>
        <Dropdown
          placeholder="التخصص (اكتب ثم اضغط إضافة)"
          options={
            specializationsData?.map((spec) => ({
              label: spec.name,
              value: spec.name,
            })) || []
          }
          selectedValue={selectedSpecializations.map((spec) => spec.name)}
          isMultiple
          onValueChange={(value: string | string[]) => {
            console.log("Selected value:", value);
            if (Array.isArray(value)) {
              const selectedSpecs = value.map((val) =>
                specializationsData.find((spec) => spec.name === val)
              );
              setSelectedSpecializations(selectedSpecs);
            } else {
              setSelectedSpecializations(
                specializationsData.filter((spec) => spec.name === value)
              );
            }
          }}
          primaryColor={Colors.mainColor}
          isSearchable
          dropdownIcon={<></>}
          placeholderStyle={{
            ...font.title,
            textAlign: "right",
            color: Colors.gray700,
          }}
          dropdownStyle={{
            alignItems: "flex-end",
            borderColor: Colors.SecondaryColorLight,
            borderRadius: 8,
          }}
        />

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

        <Controller
          name="workType"
          control={control}
          rules={{ required: "نوع العمل مطلوب" }}
          render={({ field: { onChange } }) => (
            <RadioButtonGroup
              label="نوع العمل:"
              options={[
                { label: "عمل خاص", value: "private" },
                { label: "شركة", value: "company" },
              ]}
              selectedValue={watchedWorkType}
              onSelect={(val) => onChange(val as "private" | "company")}
              error={errors.workType?.message}
            />
          )}
        />
        <View style={styles.genderContainer}>
          <Text style={styles.genderLabel}>النوع</Text>
          <GenderPicker value={isMale} onChange={setIsMale} />
        </View>
        <FileUploadButton
          label="صورة الحساب:"
          onFileSelected={(asset) => {}}
          selectedFileName={null}
        />
        <FileUploadButton
          label="صورة الكارنيه:"
          onFileSelected={(asset) => setIdCardPic(asset)}
          selectedFileName={idCardPic?.name}
        />
        <FileUploadButton
          label="صورة بطاقة الرقم القومي:"
          onFileSelected={(asset) => setNationalIdPic(asset)}
          selectedFileName={nationalIdPic?.name}
        />

        <View style={styles.mainButtonSaveContainer}>
          <MainButton
            title="حفظ البيانات"
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
    minHeight: "100%",
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
    height: 36,
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
