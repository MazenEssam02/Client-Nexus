import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../../constants/Color";
import useFilterOptions from "../../store/filterStore";
export default function DropdownList({
  placeholder,
  initialValue = null,
  onValueChange,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue || null);
  const { items } = useFilterOptions();
  useEffect(() => {
    if (value !== null && onValueChange) {
      onValueChange(value);
    }
  }, [value, onValueChange]);
  return (
    <View style={[styles.container, { zIndex: open ? 3 : 1 }]}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder={placeholder}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderBottomWidth: 2,
    borderBottomColor: Colors.mainColor,
  },
  openedContainer: {
    marginBottom: 10,
  },
  dropdown: {
    borderColor: Colors.mainColor,
    borderRadius: 10,
    textAlign: "center",
  },
  dropdownContainer: {
    borderColor: Colors.SecondaryColor,
  },
});
