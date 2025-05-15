import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import PassowrdShow from "../Icons/PasswordShow";
const InfoInput = ({ field, onChange, inputProps, info, isPassword }) => {
  const [name, setName] = useState(`${info}`);
  const [focued, setFocused] = useState(false);
  const [secure, setSecure] = useState(isPassword);
  function secureHandler() {
    setSecure((prev) => !prev);
    setTimeout(() => setSecure(true), 1000);
  }
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
          secureTextEntry={secure}
        ></TextInput>
        {isPassword && (
          <Pressable style={styles.Icon} onPress={secureHandler}>
            <PassowrdShow />
          </Pressable>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row-reverse",
    backgroundColor: "white",
    borderRadius: 5,
    width: "100%",
    padding: 5,
    marginTop: 3,
  },
  input: {
    width: "90%",
    textAlign: "right",
  },
  Icon: {
    borderRightWidth: 1,
    borderRightColor: "black",
    paddingRight: 5,
  },
});
export default InfoInput;
