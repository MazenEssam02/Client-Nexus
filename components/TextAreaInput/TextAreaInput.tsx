import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

interface TextAreaInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  numberOfLines?: number;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  placeholder,
  value,
  onChangeText,
  error,
  containerStyle,
  inputStyle,
  numberOfLines = 4,
  onBlur,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, error ? styles.errorBorder : {}, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.gray700}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        onBlur={onBlur}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.SecondaryColorLight,
    ...font.title,
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
  errorBorder: {
    borderColor: Colors.invalidColor200 || "red",
  },
  errorText: {
    ...font.Caption,
    color: Colors.invalidColor200 || "red",
    marginTop: 4,
    textAlign: "right",
  },
});
