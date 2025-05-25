import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardTypeOptions,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

interface LabeledInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  required?: boolean;
  editable?: boolean;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry,
  keyboardType,
  containerStyle,
  inputStyle,
  labelStyle,
  required,
  editable = true,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {required && <Text style={styles.requiredAsterisk}>*</Text>}
      </View>
      <TextInput
        style={[
          styles.input,
          error ? styles.errorBorder : {},
          !editable ? styles.disabledInput : {},
          inputStyle,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={Colors.gray500}
        editable={editable}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    ...font.subtitle,
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
  requiredAsterisk: {
    color: Colors.invalidColor200 || "red",
    marginLeft: 4,
    fontSize: 16,
    lineHeight: (font.subtitle?.fontSize || 16) * 1.1,
  },
  input: {
    backgroundColor: Colors.gray200 || "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.gray500 || "#e0e0e0",
    ...font.body,
    color: Colors.SecondaryColor,
    textAlign: "right",
    minHeight: 50,
  },
  disabledInput: {
    backgroundColor: Colors.gray200 || "#e9ecef",
  },
  errorBorder: {
    borderColor: Colors.invalidColor200 || "red",
  },
  errorText: {
    ...font.Caption,
    color: Colors.invalidColor200 || "red",
    marginTop: 5,
    textAlign: "right",
  },
});
