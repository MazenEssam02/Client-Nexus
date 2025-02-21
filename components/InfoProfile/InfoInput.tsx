import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const InfoInput = ({ field, onChange, inputProps, info }) => {
  const [name, setName] = useState("");
  const [focued, setFocused] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...inputProps}
        placeholder={focued ? "" : `${info}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={(text) => setName(text)}
        value={name}
        style={styles.input}
        autoFocus={false}
        onEndEditing={() => onChange(field, name)}
      ></TextInput>
    </View>
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
