import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import PassowrdShow from "../Icons/PasswordShow";
import useProfileStore from "../../store/Profile";
const InfoInput = ({ field, form }) => {
  const [focued, setFocused] = useState(false);
  function handleTextChange(text) {
    form.onChange(text);
  }
  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={focued ? "" : form.value}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          onChangeText={handleTextChange}
          value={form.value}
          style={styles.input}
        ></TextInput>
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
