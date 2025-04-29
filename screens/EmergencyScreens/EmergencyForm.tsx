import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Text,
} from "react-native";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Color";
import { MainButton } from "../../components/Buttons/MainButton";
import OutlinedButton from "../../components/Buttons/OutlineButton";
import { useIsFocused, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { font } from "../../constants/Font";
export default function EmergencyForm({ navigation }) {
  const route = useRoute();
  const [pickedLocation, setPickedLocation] = useState(null);
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
    // }
    if (
      !!dataEntered.phoneNumber &&
      !!pickedLocation &&
      !!dataEntered.description
    ) {
      navigation.navigate("Requests");
    }
  }
  function mapHandler() {
    navigation.navigate("MapScreen");
  }

  let locationPreview = (
    <Text style={styles.locationText}>لم يتم اختيار الموقع بعد</Text>
  );

  if (pickedLocation) {
    locationPreview = (
      <MapView
        style={styles.imagePreview}
        initialRegion={{
          latitude: pickedLocation.lat,
          longitude: pickedLocation.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          title="الموقع المختار"
          coordinate={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
          }}
        />
      </MapView>
    );
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
          {/* <Input
            label="العنوان"
            isValid={inputText.address.isValid}
            inputConfig={{
              onChangeText: inputTextHandler.bind(this, "address"),
            }}
          /> */}
          <View style={styles.mapPreview}>{locationPreview}</View>
          <View style={styles.outlineButtonContainer}>
            <OutlinedButton icon="map" onPress={mapHandler}>
              اختيار الموقع
            </OutlinedButton>
          </View>

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
