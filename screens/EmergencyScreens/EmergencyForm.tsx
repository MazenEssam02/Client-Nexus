import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { Colors } from "../../constants/Color";
import { MainButton } from "../../components/Buttons/MainButton";
export default function EmergencyForm({ navigation }) {
  const [inputText, setInputText] = useState({
    phoneNumber: {
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
      address: inputText.address.value,
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
    // }
    if (
      !!dataEntered.phoneNumber &&
      !!dataEntered.address &&
      !!dataEntered.description
    ) {
      navigation.navigate("Requests");
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView keyboardDismissMode="on-drag">
        <View style={styles.innerContainer}>
          <Input
            label="رقم الهاتف"
            isValid={inputText.phoneNumber.isValid}
            inputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputTextHandler.bind(this, "phoneNumber"),
            }}
          />
          <Input
            label="العنوان"
            isValid={inputText.address.isValid}
            inputConfig={{
              onChangeText: inputTextHandler.bind(this, "address"),
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
              onPress={() => {
                onSubmitHandler();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  // scrollContainer: {
  //   height: "100%",
  // },
  innerContainer: {
    marginVertical: 50,
    height: 600,
    backgroundColor: "white",
    // justifyContent: "center",
    borderRadius: 12,
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 10,
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
