import { View, StyleSheet, Text } from "react-native";
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
    const expenceEntered = {
      phoneNumber: inputText.phoneNumber.value,
      address: inputText.address.value,
      description: inputText.description.value,
    };
    if (
      !expenceEntered.phoneNumber ||
      !expenceEntered.address ||
      !expenceEntered.description
    ) {
      setInputText((curInputText) => {
        return {
          phoneNumber: {
            value: curInputText.phoneNumber.value,
            isValid: !expenceEntered.phoneNumber,
          },
          address: {
            value: curInputText.address.value,
            isValid: !expenceEntered.address,
          },
          description: {
            value: curInputText.description.value,
            isValid: !expenceEntered.description,
          },
        };
      });
      return;
    }
  }
  return (
    <View style={styles.container}>
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
          <MainButton title="طلب محامى عاجل" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  innerContainer: {
    height: "80%",
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonContainer: {
    marginTop: 50,
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
