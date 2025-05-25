import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

interface AddressListItemProps {
  addressText: string;
  onRemove: () => void;
}

export const AddressListItem: React.FC<AddressListItemProps> = ({
  addressText,
  onRemove,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.addressText} numberOfLines={2}>
        {addressText}
      </Text>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>إزالة العنوان</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.gray200 || "#f5f5f5",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  addressText: {
    ...font.body,
    color: Colors.SecondaryColor,
    flex: 1,
    textAlign: "right",
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: Colors.invalidColor200 || "#FF6B6B",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButtonText: {
    ...font.Button,
    color: Colors.gray200,
    fontSize: 12,
  },
});
