import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";

const DatePickerInput = ({ date, onDateChange, placeholder }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);
  const handleConfirm = (selectedDate) => {
    onDateChange(selectedDate);
    hidePicker();
  };

  return (
    <>
      <TouchableOpacity style={styles.input} onPress={showPicker}>
        <Text style={[styles.inputText, !date && { color: Colors.gray500 }]}>
          {date ? date.toLocaleDateString() : placeholder}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        date={date || new Date()}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        confirmTextIOS="تأكيد"
        cancelTextIOS="إلغاء"
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.SecondaryColorLight,
    borderRadius: 8,
    marginBottom: 16,
  },
  inputText: {
    ...font.title,
    color: "black",
    textAlign: "right",
  },
});

export default DatePickerInput;
