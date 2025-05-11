import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "./RadioButton";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";

interface RadioOption<T = string> {
  label: string;
  value: T;
}

interface RadioButtonGroupProps<T = string> {
  label: string;
  options: RadioOption<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  error?: string;
}

export const RadioButtonGroup = <T extends string | number = string>({
  label,
  options,
  selectedValue,
  onSelect,
  error,
}: RadioButtonGroupProps<T>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.groupLabel}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <RadioButton
            key={option.value.toString()}
            label={option.label}
            selected={selectedValue === option.value}
            onPress={() => onSelect(option.value)}
          />
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
    alignItems: "flex-end",
  },
  groupLabel: {
    ...font.subtitle,
    color: Colors.SecondaryColor,
    marginBottom: 10,
    textAlign: "right",
  },
  optionsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
  errorText: {
    ...font.Caption,
    color: Colors.invalidColor200 || "red",
    marginTop: 4,
    textAlign: "right",
  },
});
