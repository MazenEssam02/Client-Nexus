// components/Address/AddAddressFormView.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import MapView, { Region, LatLng } from "react-native-maps";
import * as Location from "expo-location";

import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { LabeledInput } from "./LabeledInput";
import { MainButton } from "../Buttons/MainButton";

const LocationPinIcon = ({ style }: { style?: any }) => (
  <Text style={[{ fontSize: 22, color: Colors.SecondaryColor }, style]}>
    📍
  </Text>
);
const CloseIcon = ({ style }: { style?: any }) => (
  <Text style={[{ fontSize: 24, color: Colors.gray700 }, style]}>✕</Text>
); // Will be used by ModalHeader now
const CurrentLocationIcon = ({ style }: { style?: any }) => (
  <Text style={[{ fontSize: 28, color: Colors.SecondaryColor }, style]}>
    🎯
  </Text>
);
const MapCenterMarker = ({ style }: { style?: any }) => (
  <Text style={[{ fontSize: 40, color: "red", position: "absolute" }, style]}>
    📍
  </Text>
);

export interface NewAddressData {
  // Data structure for the newly created address
  id: string;
  text: string; // Formatted text for display in the list
  fullAddressDetails?: {
    // Optional: if you want to store more structured data
    detectedOnMap: string;
    coordinates?: LatLng;
    formInput: AddAddressFormData;
  };
}

interface AddAddressFormData {
  governorate: string;
  area: string;
  detailedAddress: string;
  addressNickname: string;
}

interface AddAddressFormViewProps {
  onAddressSaved: (newAddress: NewAddressData) => void;
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
  const [selectedAddress, setSelectedAddress] = useState<string>(
    "جاري تحديد الموقع..."
  );
  const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);
  const [currentMarkerCoords, setCurrentMarkerCoords] = useState<
    LatLng | undefined
  >(undefined);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const mapRef = useRef<MapView>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<AddAddressFormData>({
    defaultValues: {
      governorate: "",
      area: "",
      detailedAddress: "",
      addressNickname: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    let isMounted = true;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!isMounted) return;
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is needed.");
        setSelectedAddress("Location permission denied.");
        setMapRegion({
          latitude: 30.0444,
          longitude: 31.2357,
          ...initialRegionDelta,
        });
        setCurrentMarkerCoords({ latitude: 30.0444, longitude: 31.2357 });
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        if (!isMounted) return;
        const initialCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setMapRegion({ ...initialCoords, ...initialRegionDelta });
        setCurrentMarkerCoords(initialCoords);
        reverseGeocodeCoordinates(initialCoords);
      } catch (error) {
        if (!isMounted) return;
        setSelectedAddress("Could not fetch current location.");
        setMapRegion({
          latitude: 30.0444,
          longitude: 31.2357,
          ...initialRegionDelta,
        });
        setCurrentMarkerCoords({ latitude: 30.0444, longitude: 31.2357 });
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const reverseGeocodeCoordinates = async (coords: LatLng) => {
    if (!coords) return;
    setIsGeocoding(true);
    try {
      let geocodedAddresses = await Location.reverseGeocodeAsync(coords);
      if (geocodedAddresses && geocodedAddresses.length > 0) {
        const g = geocodedAddresses[0];
        const addressString = [
          g.streetNumber,
          g.street,
          g.district,
          g.city,
          g.subregion,
          g.country,
        ]
          .filter(Boolean)
          .join(", ");
        setSelectedAddress(addressString || "Address details not found");
        if (g.city) setValue("governorate", g.city);
        if (g.subregion) setValue("area", g.subregion);
        if (g.street)
          setValue(
            "detailedAddress",
            `${g.streetNumber || ""} ${g.street}`.trim()
          );
      } else {
        setSelectedAddress("Address details not found");
      }
    } catch (error) {
      setSelectedAddress("Could not determine address from map.");
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleRegionChangeComplete = (region: Region) => {
    setMapRegion(region);
    const newCenterCoords = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    setCurrentMarkerCoords(newCenterCoords);
    reverseGeocodeCoordinates(newCenterCoords);
  };

  const goToCurrentLocation = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      status = (await Location.requestForegroundPermissionsAsync()).status;
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is needed.");
        return;
      }
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      const currentCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      mapRef.current?.animateToRegion(
        { ...currentCoords, ...initialRegionDelta },
        1000
      );
    } catch (error) {
      Alert.alert("Error", "Could not fetch current location.");
    }
  };

  const onSubmit: SubmitHandler<AddAddressFormData> = (data) => {
    const displayAddressText = `${
      data.addressNickname ? data.addressNickname + ": " : ""
    }${data.detailedAddress || "N/A"}, ${data.area || "N/A"}, ${
      data.governorate || "N/A"
    }`.replace(/ ,|, $/g, "");

    const newAddress: NewAddressData = {
      id: `addr-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      text: displayAddressText,
      fullAddressDetails: {
        detectedOnMap: selectedAddress,
        coordinates: currentMarkerCoords,
        formInput: data,
      },
    };
    onAddressSaved(newAddress);
  };

  return (
    <View style={styles.fullFormContainer}>
      <View style={styles.mapWrapper}>
        {mapRegion ? (
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            initialRegion={mapRegion}
            onRegionChangeComplete={handleRegionChangeComplete}
            onMapReady={() => setIsMapReady(true)}
            showsUserLocation={false}
            showsMyLocationButton={false}
          />
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.mainColor} />
            <Text style={styles.loadingText}>Loading Map...</Text>
          </View>
        )}
        <MapCenterMarker style={styles.mapCenterPin} />
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={goToCurrentLocation}
          disabled={!isMapReady}
        >
          <CurrentLocationIcon />
        </TouchableOpacity>
      </View>

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
          <View style={styles.selectedAddressContainer}>
            {isGeocoding ? (
              <ActivityIndicator
                size="small"
                color={Colors.mainColor}
                style={styles.addressActivityIndicator}
              />
            ) : null}
            <Text style={styles.selectedAddressText} numberOfLines={2}>
              {selectedAddress}
            </Text>
          </View>

          <Controller
            control={control}
            name="governorate"
            rules={{ required: "المحافظة مطلوبة" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <LabeledInput
                label="المحافظة"
                placeholder="المحافظة"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.governorate?.message}
                required
              />
            )}
          />
          <Controller
            control={control}
            name="area"
            rules={{ required: "المنطقة مطلوبة" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <LabeledInput
                label="المنطقة"
                placeholder="المنطقة / الحي"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.area?.message}
                required
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
          <Controller
            control={control}
            name="addressNickname"
            render={({ field: { onChange, onBlur, value } }) => (
              <LabeledInput
                label="اسم العنوان (مثال: المنزل، العمل)"
                placeholder="الاسم"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.addressNickname?.message}
              />
            )}
          />
          <View style={styles.saveButtonContainer}>
            <MainButton
              title="حفظ العنوان"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isGeocoding}
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
});
