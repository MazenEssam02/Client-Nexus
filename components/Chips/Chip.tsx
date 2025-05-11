import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

interface ChipProps {
  text: string;
  onRemove?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ text, onRemove }) => {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{text}</Text>
      {onRemove && (
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.removeIcon}>x</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: Colors.gray200 || "#e0e0e0",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    alignSelf: "flex-start",
  },
  chipText: {
    ...font.Caption,
    color: Colors.SecondaryColor,
    marginRight: 8,
  },
  removeIcon: {
    fontSize: 14,
    color: Colors.gray700,
  },
});
