import { View, StyleSheet, Text, TextInput } from "react-native";
import { Colors } from "../../constants/Color";

function Input({
  label,
  inputConfig,
  style = {},
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
        textAlign="right"
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

  inputItem: {
    color: Colors.SecondaryColor,
    padding: 12,
    margin: 10,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.SecondaryColorLight,
  },
  inputMultiLine: {
    textAlignVertical: "bottom",
    minHeight: "50%",
  },

  invalidInput: {
    borderWidth: 1,
    borderColor: Colors.invalidColor600,
  },
});
