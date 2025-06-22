import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";

// Pass `value` as a boolean (true => offline, false => online)
// and `onChange` as a callback that receives true/false
// whenever the user taps on a segment.
export const BookingPicker = ({ value, onChange, setSlot }) => {
  function pressHandler(changeValue) {
    onChange(changeValue);
    setSlot(null);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.segment,
          value === 79 ? styles.selectedSegment : styles.unselectedSegment,
        ]}
        onPress={() => pressHandler(79)}
        activeOpacity={0.9}
      >
        <Text
          style={[
            styles.segmentText,
            value === 79 ? styles.selectedText : styles.unselectedText,
          ]}
        >
          اونلاين
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          {
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: Colors.mainColor,
          },
          styles.segment,
          value === 80 ? styles.selectedSegment : styles.unselectedSegment,
        ]}
        onPress={() => pressHandler(80)}
        activeOpacity={0.9}
      >
        <Text
          style={[
            styles.segmentText,
            value === 80 ? styles.selectedText : styles.unselectedText,
          ]}
        >
          استشارة هاتفية
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.segment,
          value === 73 ? styles.selectedSegment : styles.unselectedSegment,
        ]}
        onPress={() => pressHandler(73)}
        activeOpacity={0.9}
      >
        <Text
          style={[
            styles.segmentText,
            value === 73 ? styles.selectedText : styles.unselectedText,
          ]}
        >
          استشارة مكتبية
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Container with 2 segments side by side
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.mainColor, // example brown color
    borderRadius: 20,
    overflow: "hidden", // so the corners are rounded
    width: "100%",
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedSegment: {
    backgroundColor: "#A77B52", // selected background color
  },
  unselectedSegment: {
    backgroundColor: "#FFFFFF", // unselected background color
  },
  segmentText: {
    ...font.Caption,
    lineHeight: 22,
    // or any other shared text style
  },
  selectedText: {
    color: "#FFFFFF", // text color for selected
  },
  unselectedText: {
    color: "#A77B52", // text color for unselected
  },
});
