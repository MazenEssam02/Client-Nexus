import React, { useState } from "react";
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
import { Controller, useForm, SubmitHandler } from "react-hook-form";

import { font } from "../constants/Font";
import { Colors } from "../constants/Color";
import { MainButton } from "../components/Buttons/MainButton";
import { TextAreaInput } from "../components/TextAreaInput/TextAreaInput";
import { ChipList } from "../components/Chips/ChipList";
import { RadioButtonGroup } from "../components/RadioButton/RadioButtonGroup";
import {
  FileUploadButton,
  SelectedAsset,
} from "../components/FileUploadButton/FileUploadButton";
import { AddressListModal } from "../components/AddressListModal/AddressListModal";
import { LoginIllustration } from "../components/Icons/LoginIllustration";
import { LoginInput } from "../components/LoginInput/LoginInput";
import { NewAddressData } from "../components/AddressListModal/AddAddressFormView";

interface IChip {
  id: string;
  label: string;
}

interface AddressListItemData {
  // This should align with NewAddressData's relevant parts
  id: string;
  text: string;
  // fullAddressDetails?: any; // if you store it
}

interface LawyerRegisterFormData {
  name: string;
  yearsOfExperience: string;
  details: string;
  workType: "private" | "company";
}

const LawyerRegisterScreen = ({ route }) => {
  const [specializations, setSpecializations] = useState<IChip[]>([
    { id: "spec1", label: "تخصص 1" },
    { id: "spec2", label: "تخصص 2" },
  ]);
  const [currentSpecializationText, setCurrentSpecializationText] =
    useState<string>("");
  const commonFormData = route.params.data;

  const [profilePic, setProfilePic] = useState<SelectedAsset | null>(null);
  const [idCardPic, setIdCardPic] = useState<SelectedAsset | null>(null);
  const [nationalIdPic, setNationalIdPic] = useState<SelectedAsset | null>(
    null
  );

  const [isAddressModalVisible, setIsAddressModalVisible] =
    useState<boolean>(false);
  const [addresses, setAddresses] = useState<AddressListItemData[]>([
    { id: "addr1", text: "التجمع الخامس, القاهرة الجديدة, القاهرة" },
    { id: "addr2", text: "شارع التسعين, التجمع الأول, القاهرة الجديدة" },
  ]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LawyerRegisterFormData>({
    defaultValues: {
      name: "",
      yearsOfExperience: "",
      details: "",
      workType: "private",
    },
    mode: "onChange",
  });
  const watchedWorkType = watch("workType");

  const handleFormSubmit: SubmitHandler<LawyerRegisterFormData> = async (
    data
  ) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("yearsOfExperience", data.yearsOfExperience);
    formData.append("details", data.details);
    formData.append("workType", data.workType);

    specializations.forEach((spec, index) => {
      formData.append(`specializations[${index}]`, spec.label);
    });

    addresses.forEach((addr, index) => {
      formData.append(`addresses[${index}]`, addr.text);
    });

    formData.append("profileImageFile", {
      uri: profilePic.uri,
      name: profilePic.name,
      type: profilePic.type,
    } as any);
    formData.append("idCardImageFile", {
      uri: idCardPic.uri,
      name: idCardPic.name,
      type: idCardPic.type,
    } as any);
    formData.append("nationalIdImageFile", {
      uri: nationalIdPic.uri,
      name: nationalIdPic.name,
      type: nationalIdPic.type,
    } as any);

    console.log("Lawyer Info FormData Prepared: ", formData);
    Alert.alert("تم الحفظ", "بيانات المحامي جاهزة للإرسال.");
    // Example API call:
    // try {
    //   const response = await axios.post('YOUR_API_ENDPOINT', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });
    //   console.log('Server response:', response.data);
    //   Alert.alert("نجاح", "تم حفظ بيانات المحامي بنجاح.");
    // } catch (error) {
    //   console.error('API Error:', error);
    //   Alert.alert("خطأ", "لم يتم حفظ البيانات.");
    // }
  };
  console.log("Form Data: ", {
    name: watch("name"),
    yearsOfExperience: watch("yearsOfExperience"),
    details: watch("details"),
    workType: watchedWorkType,
    locations: addresses,
    specializations: specializations,
    images: {
      profilePic,
      idCardPic,
      nationalIdPic,
    },
  });

  const handleAddSpecialization = () => {
    if (currentSpecializationText.trim() !== "") {
      const newSpec: IChip = {
        id: `spec${Date.now()}`,
        label: currentSpecializationText.trim(),
      };
      setSpecializations((prevSpecs) => [...prevSpecs, newSpec]);
      setCurrentSpecializationText("");
    }
  };

  const handleRemoveSpecialization = (idToRemove: string) => {
    setSpecializations((prevSpecs) =>
      prevSpecs.filter((spec) => spec.id !== idToRemove)
    );
  };

  const handleRemoveAddress = (addressId: string) => {
    setAddresses((prevAddrs) =>
      prevAddrs.filter((addr) => addr.id !== addressId)
    );
  };

  const handleAddNewAddressFromModal = (newAddress: NewAddressData) => {
    const newListItem: AddressListItemData = {
      id: newAddress.id,
      text: newAddress.text,
      // fullAddressDetails: newAddress.fullAddressDetails // if needed
    };
    setAddresses((prevAddresses) => [...prevAddresses, newListItem]);
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

        <LoginInput
          placeholder="التخصص (اكتب ثم اضغط إضافة)"
          value={currentSpecializationText}
          onChangeText={setCurrentSpecializationText}
          placeholderTextColor={Colors.gray700}
        />
        {currentSpecializationText.trim() !== "" && (
          <TouchableOpacity
            onPress={handleAddSpecialization}
            style={styles.addSpecButton}
          >
            <Text style={styles.addSpecButtonTextContent}>
              + إضافة هذا التخصص
            </Text>
          </TouchableOpacity>
        )}
        <ChipList
          items={specializations}
          onRemoveItem={handleRemoveSpecialization}
          containerStyle={styles.chipListContainer}
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
          label="صورة الحساب:"
          onFileSelected={(asset) => setProfilePic(asset)}
          selectedFileName={profilePic?.name}
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
              !profilePic ||
              !idCardPic ||
              !nationalIdPic ||
              !specializations.length ||
              !addresses.length
            }
          />
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
