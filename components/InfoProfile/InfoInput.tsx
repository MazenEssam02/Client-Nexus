import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
const InfoInput = ({ field, onChange, inputProps, info }) => {
  const [name, setName] = useState(`${info}`);
  const [focued, setFocused] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inputContainer}>
        <TextInput
          {...inputProps}
          placeholder={focued ? "" : `${info}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={(text) => setName(text)}
          value={name}
          style={styles.input}
          onEndEditing={() => onChange(field, name)}
        ></TextInput>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 5,
    marginTop: 3,
  },
  input: {
    width: "100%",
    textAlign: "right",
  },
});
export default InfoInput;
