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
  const {
    cities,
    state,
    specialities,
    fetchCities,
    fetchStates,
    fetchSpecialities,
  } = useFilterOptions();
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (placeholder === "المدينة") {
        await fetchStates();
        setItems(state.map((s) => ({ label: s.label, value: s.label })));
      } else if (placeholder === "المنطقة") {
        await fetchCities();
        setItems(cities.map((c) => ({ label: c.label, value: c.label })));
      } else if (placeholder === "التخصص") {
        await fetchSpecialities();
        setItems(
          specialities.map((speciality) => ({
            label: speciality.label,
            value: speciality.label,
          }))
        );
      } else {
        setItems([
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ]);
      }
    };

    fetchData();
  }, [placeholder, fetchCities, fetchStates, fetchSpecialities]);

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
        dropDownDirection="TOP"
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
  openedContainer: {},
  dropdown: {
    borderColor: Colors.mainColor,
    borderRadius: 10,
    textAlign: "center",
  },
  dropdownContainer: {
    borderColor: Colors.SecondaryColor,
  },
});
