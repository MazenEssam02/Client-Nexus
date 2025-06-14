import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Color";
import { MainButton } from "../../components/Buttons/MainButton";
import { font } from "../../constants/Font";
import * as Location from "expo-location";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import IsError from "../../components/IsError/IsError";
import { EmeregencyCases } from "../../API/https";
import { useMutation } from "@tanstack/react-query";
import useEmergencyStore from "../../store/EmergencyStore";
export default function EmergencyForm({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [inputText, setInputText] = useState({
    title: {
      value: "",
      isValid: true,
    },
    address: {
      value: "",
      isValid: true,
    },
    description: {
      value: "",
      isValid: true,
    },
  });
  const {
    mutate: requestEmergency,
    reset: resetRequestMutation,
    isPending,
  } = useMutation({
    mutationFn: EmeregencyCases.requestEmergency,
    onSuccess: (data) => {
      const emergencyCaseId = data.data.id;
      const emergencyCaseLimit = data.data.timeoutInMinutes;
      console.log("Created emergency case ID:", emergencyCaseId);
      useEmergencyStore.getState().setLawyer({
        id: 0,
        phone: "",
        price: 0,
        title: inputText.title.value,
        description: inputText.description.value,
      });
      navigation.navigate("Requests", {
        emergencyCaseId: emergencyCaseId,
        emergencyCaseLimit: emergencyCaseLimit,
      });

      resetRequestMutation();
    },
    onError: (err) => {
      Alert.alert("خطأ", "لديك طلب مفتوح بالفعل او لا يوجد هاتف مع الحساب");
      console.error("request error:", err);
      if ("response" in err && (err as any).response?.data) {
        console.error("Full error:", (err as any).response?.data); // Server's validation messages
      } else {
        console.error("Error:", err);
      }
    },
  });
  useEffect(() => {
    (async () => {
      const { status: existingStatus } =
        await Location.getForegroundPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        Alert.alert("خطأ", "يرجى السماح بالوصول إلى الموقع");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setCurrentLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

  function inputTextHandler(inputPicker, inputNewText) {
    setInputText((curInputText) => {
      return {
        ...curInputText,
        [inputPicker]: { value: inputNewText, isValid: true },
      };
    });
  }
  function onSubmitHandler() {
    const dataEntered = {
      title: inputText.title.value,
      address: inputText.address.value,
      description: inputText.description.value,
    };

    setInputText((curInputText) => {
      return {
        title: {
          value: curInputText.title.value,
          isValid: !!dataEntered.title,
        },
        address: {
          value: curInputText.address.value,
          isValid: !!dataEntered.address,
        },
        description: {
          value: curInputText.description.value,
          isValid: !!dataEntered.description,
        },
      };
    });

    if (
      !!dataEntered.title &&
      !!dataEntered.address &&
      !!dataEntered.description
    ) {
      requestEmergency({
        name: inputText.title.value,
        description: inputText.description.value,
        meetingTextAddress: inputText.address.value,
        meetingLatitude: currentLocation.latitude,
        meetingLongitude: currentLocation.longitude,
      });
    }
  }
  if (loading) {
    return <LoadingSpinner />;
  }
  if (errorMsg) {
    return <IsError error={errorMsg} />;
  }
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
        <View style={styles.innerContainer}>
          <Input
            label="العنوان"
            isValid={inputText.address.isValid}
            inputConfig={{
              // keyboardType: "decimal-pad",
              onChangeText: inputTextHandler.bind(this, "address"),
            }}
          />
          <Input
            label="عنوان المشكلة"
            isValid={inputText.title.isValid}
            inputConfig={{
              onChangeText: inputTextHandler.bind(this, "title"),
            }}
          />

          <Input
            label="برجاء كتابة تفاصيل المشكلة"
            isValid={inputText.description.isValid}
            inputConfig={{
              onChangeText: inputTextHandler.bind(this, "description"),
              multiline: true,
            }}
          />
          <View style={styles.buttonContainer}>
            <MainButton
              title="طلب محامى عاجل"
              disabled={isPending}
              onPress={() => {
                onSubmitHandler();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 15,
  },

  scrollContent: {
    paddingBottom: 25,
    flexGrow: 1,
  },
  innerContainer: {
    marginVertical: 50,
    height: "auto",
    backgroundColor: "white",
    borderRadius: 12,
  },
  mapPreview: {
    margin: 10,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.SecondaryColorLight,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  locationText: {
    color: Colors.gray500,
    ...font.title,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  outlineButtonContainer: {
    width: "40%",
    alignSelf: "flex-end",
    margin: 10,
    marginTop: -5,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
