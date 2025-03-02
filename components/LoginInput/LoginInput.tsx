import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { isArabicChar } from "../../helpers/language";

interface LoginInputProps extends TextInputProps {
  error?: string;
}

export const LoginInput: React.FC<LoginInputProps> = ({
  error,
  style,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.SecondaryColorLight,
    borderRadius: 8,
    ...font.title,
    color: "black",
    textAlign: "auto",
    textAlignVertical: "center",
    lineHeight: 26,
  },
  inputError: {
    color: Colors.invalidColor600,
    borderColor: Colors.invalidColor600,
  },
  errorText: {
    color: Colors.invalidColor600,
    alignSelf: "flex-end",
    ...font.subtitle,
  },
});
