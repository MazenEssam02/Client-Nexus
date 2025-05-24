import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import Dropdown from "react-native-input-select";

import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { LabeledInput } from "./LabeledInput";
import { MainButton } from "../Buttons/MainButton";
import { Address } from "./AddressListModal";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../API/https";

interface AddAddressFormData {
  stateId: number | null;
  cityId: number | null;
  detailedAddress: string;
}

interface AddAddressFormViewProps {
  onAddressSaved: (newAddress: Address) => void;
  onCancel: () => void; // To switch view back to list
}

const initialRegionDelta = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const AddAddressFormView: React.FC<AddAddressFormViewProps> = ({
  onAddressSaved,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<AddAddressFormData>({
    defaultValues: {
      stateId: null,
      cityId: null,
      detailedAddress: "",
    },
    mode: "onChange",
  });
  const { data: availableStates, isLoading: statesLoading } = useQuery<
    {
      id: number;
      name: string;
    }[]
  >({
    queryKey: ["getStates"],
    queryFn: () => apiClient.get("/api/City").then((res) => res.data.data),
  });
  const { data: availableCities, isLoading: citiesLoading } = useQuery<
    {
      id: number;
      name: string;
    }[]
  >({
    queryKey: ["getCities"],
    queryFn: () => apiClient.get("/api/State").then((res) => res.data.data),
  });

  const onSubmit: SubmitHandler<AddAddressFormData> = (data) => {
    onAddressSaved({
      id: Date.now().toString(),
      detailedAddress: data.detailedAddress,
      cityId: data.cityId || 0,
      stateId: data.stateId || 0,
    });
  };

  return (
    <View style={styles.fullFormContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined} // 'height' might be too aggressive inside a modal
        style={styles.keyboardAvoiding}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Adjust if header is taller
      >
        <ScrollView
          style={styles.formScrollView}
          contentContainerStyle={styles.formContentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.labelContainer}>
            <Text style={[styles.label]}>الولاية</Text>
            <Text style={styles.requiredAsterisk}>*</Text>
          </View>
          <Controller
            control={control}
            name="stateId"
            rules={{ required: "الولاية مطلوبة" }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                placeholder="اختر الولاية"
                options={
                  availableStates?.map((state) => ({
                    label: state.name,
                    value: state.id,
                  })) || []
                }
                disabled={statesLoading}
                selectedValue={value}
                onValueChange={(itemValue) => {
                  onChange(itemValue);
                  setValue("cityId", null); // Reset city when state changes
                }}
                error={errors.stateId?.message}
              />
            )}
          />
          <View style={styles.labelContainer}>
            <Text style={[styles.label]}>المدينة</Text>
            <Text style={styles.requiredAsterisk}>*</Text>
          </View>
          <Controller
            control={control}
            name="cityId"
            rules={{ required: "المدينة مطلوبة" }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                placeholder="اختر المدينة"
                options={
                  availableCities?.map((city) => ({
                    label: city.name,
                    value: city.id,
                  })) || []
                }
                disabled={citiesLoading || !availableStates}
                selectedValue={value}
                onValueChange={onChange}
                error={errors.cityId?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="detailedAddress"
            rules={{ required: "العنوان المفصل مطلوب" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <LabeledInput
                label="العنوان المفصل"
                placeholder="رقم المبنى، اسم الشارع، رقم الشقة"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.detailedAddress?.message}
                required
              />
            )}
          />
          <View style={styles.saveButtonContainer}>
            <MainButton
              title="حفظ العنوان"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || statesLoading || citiesLoading}
              style={styles.saveButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullFormContainer: {
    flex: 1, // Important for the KeyboardAvoidingView and ScrollView to work correctly within the modal
    backgroundColor: "#fff", // Ensures no transparency issues
  },
  mapWrapper: {
    height: Platform.OS === "ios" ? "40%" : "35%", // Adjust height for modal context
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray200,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray200,
  },
  loadingText: { marginTop: 10, ...font.body, color: Colors.gray700 },
  mapCenterPin: { transform: [{ translateY: -20 }] },
  currentLocationButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 25,
    elevation: 3,
  },
  keyboardAvoiding: { flex: 1 }, // Crucial for content to not be hidden by keyboard
  formScrollView: { flex: 1 },
  formContentContainer: { padding: 15, paddingBottom: 30 }, // Reduced padding for modal
  selectedAddressContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.gray200,
    borderRadius: 8,
    marginBottom: 15,
    minHeight: 36,
  },
  selectedAddressText: {
    ...font.body,
    color: Colors.gray700,
    textAlign: "right",
    flex: 1,
  },
  addressActivityIndicator: { marginRight: 10 },
  saveButtonContainer: { height: 50 },
  saveButton: { marginTop: 15 },
  cancelButton: { marginTop: 10, paddingVertical: 10, alignItems: "center" },
  cancelButtonText: { ...font.Button, color: Colors.gray700, fontSize: 14 },
  labelContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    ...font.subtitle,
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
  requiredAsterisk: {
    color: Colors.invalidColor200 || "red",
    marginLeft: 4,
    fontSize: 16,
    lineHeight: (font.subtitle?.fontSize || 16) * 1.1,
  },
});
