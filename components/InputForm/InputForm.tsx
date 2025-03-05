import { View, StyleSheet, Text } from "react-native";
import Input from "../Input/Input";
function InputForm({ inputText, inputTextHandler }) {
  return (
    <View>
      <View style={styles.rowContainer}>
        <Input
          label="رقم الهاتف"
          style={styles.rowInput}
          isValid={inputText.amount.isValid}
          inputConfig={{
            value: `${inputText.amount.value ? inputText.amount.value : ""}`,
            keyboardType: "decimal-pad",
            onChangeText: inputTextHandler.bind(this, "amount"),
          }}
        />
      </View>
      <Input
        label="Description"
        isValid={inputText.description.isValid}
        inputConfig={{
          value: inputText.description.value,
          onChangeText: inputTextHandler.bind(this, "description"),
          multiline: true,
        }}
      />
    </View>
  );
}
export default InputForm;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
});
