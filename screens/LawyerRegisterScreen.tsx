import React, { use, useEffect, useState } from "react";
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

import { font } from "../constants/Font";
import { Colors } from "../constants/Color";
import { MainButton } from "../components/Buttons/MainButton";
import { TextAreaInput } from "../components/TextAreaInput/TextAreaInput";
import { RadioButtonGroup } from "../components/RadioButton/RadioButtonGroup";
import {
  FileUploadButton,
  SelectedAsset,
} from "../components/FileUploadButton/FileUploadButton";
import {
  Address,
  AddressListModal,
} from "../components/AddressListModal/AddressListModal";
import { LoginIllustration } from "../components/Icons/LoginIllustration";
import { LoginInput } from "../components/LoginInput/LoginInput";
import { apiClient } from "../API/https";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "react-native-input-select";
import { useAuthStore } from "../store/auth";

interface LawyerRegisterFormData {
  name: string;
  yearsOfExperience: string;
  officeConsultationPrice: string;
  phoneConsultationPrice: string;
  details: string;
  workType: "private" | "company";
}

const LawyerRegisterScreen = ({ route }) => {
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const { register, isLoading, error } = useAuthStore();
  const commonFormData = route.params.data as {
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
      name: "",
      yearsOfExperience: "",
      details: "",
      workType: "private",
      officeConsultationPrice: "",
      phoneConsultationPrice: "",
    },
    mode: "onChange",
  });
  const watchedWorkType = watch("workType");

  const handleFormSubmit: SubmitHandler<LawyerRegisterFormData> = async (
    data
  ) => {
    console.log("Registering user", data);
    register({
      ...commonFormData,
      addresses: addresses,
      idImage: idCardPic,
      nationalIdImage: nationalIdPic,
      yearsOfExperience: parseInt(data.yearsOfExperience),
      specializations: selectedSpecializations.map((spec) => spec.id),
      description: data.details,
      officeConsultationPrice: parseInt(data.officeConsultationPrice),
      telephoneConsultationPrice: parseInt(data.phoneConsultationPrice),
    });
  };

  const handleRemoveAddress = (addressId: string) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== addressId)
    );
  };

  const handleAddNewAddressFromModal = (newAddress: Address) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };

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
        {__DEV__ && (
          // button to fill the form with test data
          <TouchableOpacity
            onPress={async () => {
              setValue("name", "مكتب النجاح");
              setValue("yearsOfExperience", "5");
              setValue("details", "محامي متخصص في القضايا المدنية");
              setValue("workType", "private");
              setValue("officeConsultationPrice", "100");
              setValue("phoneConsultationPrice", "50");
              setSelectedSpecializations(specializationsData.slice(0, 2));
              setAddresses([
                {
                  id: "1",
                  cityId: 1,
                  detailedAddress: "عنوان 1",
                  stateId: 1,
                },
                {
                  id: "2",
                  cityId: 1,
                  detailedAddress: "عنوان 2",
                  stateId: 1,
                },
              ]);
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
        <LoginIllustration style={styles.illustration} />
        <Text style={styles.title}>أدخل معلومات المحامي</Text>

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
            disabled={
              isValid ||
              Object.keys(errors).length > 0 ||
              !idCardPic ||
              !nationalIdPic ||
              !selectedSpecializations.length ||
              !addresses.length ||
              isLoading
            }
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

export default LawyerRegisterScreen;

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
});
