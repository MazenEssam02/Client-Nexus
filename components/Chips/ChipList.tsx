import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Chip } from "./Chip";

export interface ChipItem {
  id: string;
  label: string;
}

interface ChipListProps {
  items: ChipItem[];
  onRemoveItem?: (id: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const ChipList: React.FC<ChipListProps> = ({
  items,
  onRemoveItem,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {items.map((item) => (
        <Chip
          key={item.id}
          text={item.label}
          onRemove={onRemoveItem ? () => onRemoveItem(item.id) : undefined}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});
