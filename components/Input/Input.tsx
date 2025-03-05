import { View, StyleSheet, Text, TextInput } from "react-native";
import { Colors } from "../../constants/Color";

function Input({
  label,
  inputConfig,
  style,
  isValid,
  backgroundColor = "white",
}) {
  let inputStyle = [
    styles.inputItem,
    !isValid && styles.invalidInput,
    { backgroundColor: backgroundColor },
    inputConfig && inputConfig.multiline && styles.inputMultiLine,
  ];
  return (
    <View style={[styles.itemContainer, style]}>
      <TextInput
        style={inputStyle}
        placeholderTextColor={isValid ? Colors.gray500 : Colors.invalidColor200}
        placeholder={label}
        {...inputConfig}
      />
    </View>
  );
}
export default Input;
const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 8,
  },
  Label: {
    color: "white",
    fontSize: 15,
    // fontWeight:'bold'
  },

  inputItem: {
    // backgroundColor:Colors.primaryColor800,
    color: "white",
    padding: 12,
    margin: 10,
    borderRadius: 12,
  },
  inputMultiLine: {
    textAlignVertical: "bottom",
    minHeight: 100,
  },
  invalidInputLabel: {
    color: Colors.invalidColor600,
  },
  invalidInput: {
    backgroundColor: Colors.invalidColor200,
  },
});
