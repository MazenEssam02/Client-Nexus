import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Color";
import { MainButton } from "../../components/Buttons/MainButton";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { font } from "../../constants/Font";
import LocationPreview from "../../components/LocationPreview/LocationPreview";
export default function EmergencyForm({ navigation }) {
  const route = useRoute();
  const [pickedLocation, setPickedLocation] = useState({
    lat: null,
    lng: null,
    isValid: true,
  });
  const isFocused = useIsFocused();
  const [inputText, setInputText] = useState({
    phoneNumber: {
      value: "",
      isValid: true,
    },

    description: {
      value: "",
      isValid: true,
    },
  });
  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
        isValid: !!route.params.pickedLat,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);
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
      phoneNumber: inputText.phoneNumber.value,
      description: inputText.description.value,
    };

    // if (
    //   !dataEntered.phoneNumber ||
    //   !dataEntered.address ||
    //   !dataEntered.description
    // ) {
    setInputText((curInputText) => {
      return {
        phoneNumber: {
          value: curInputText.phoneNumber.value,
          isValid: !!dataEntered.phoneNumber,
        },

        description: {
          value: curInputText.description.value,
          isValid: !!dataEntered.description,
        },
      };
    });
    setPickedLocation({
      lat: pickedLocation.lat,
      lng: pickedLocation.lng,
      isValid: !!pickedLocation.lat,
    });
    // }
    if (
      !!dataEntered.phoneNumber &&
      !!pickedLocation.isValid &&
      !!dataEntered.description
    ) {
      navigation.navigate("Requests");
    }
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
            label="رقم الهاتف"
            isValid={inputText.phoneNumber.isValid}
            inputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputTextHandler.bind(this, "phoneNumber"),
            }}
          />
          <LocationPreview
            navigation={navigation}
            pickedLocation={pickedLocation}
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
