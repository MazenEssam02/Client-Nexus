import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../../constants/Color";

export default function DropdownList({ placeholder }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "وسط البلد", value: "وسط البلد" },
    { label: "القاهرة الجديدة", value: "القاهرة الجديدة" },
    { label: "مدينة نصر", value: "مدينة نصر" },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
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
  dropdown: {
    borderColor: Colors.mainColor,
    borderRadius: 10,
    textAlign: "center",
  },
  dropdownContainer: {
    borderColor: Colors.SecondaryColor,
  },
});
