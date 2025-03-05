import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { font } from "../../constants/Font";

// Pass `value` as a boolean (true => male, false => female)
// and `onChange` as a callback that receives true/false
// whenever the user taps on a segment.
export const GenderPicker = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      {/* Left half => أنثى */}
      <TouchableOpacity
        style={[
          styles.segment,
          !value ? styles.selectedSegment : styles.unselectedSegment,
        ]}
        onPress={() => onChange(false)}
        activeOpacity={0.9}
      >
        <Text
          style={[
            styles.segmentText,
            !value ? styles.selectedText : styles.unselectedText,
          ]}
        >
          أنثى
        </Text>
      </TouchableOpacity>

      {/* Right half => ذكر */}
      <TouchableOpacity
        style={[
          styles.segment,
          value ? styles.selectedSegment : styles.unselectedSegment,
        ]}
        onPress={() => onChange(true)}
        activeOpacity={0.9}
      >
        <Text
          style={[
            styles.segmentText,
            value ? styles.selectedText : styles.unselectedText,
          ]}
        >
          ذكر
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
    borderColor: "#A77B52", // example brown color
    borderRadius: 20,
    overflow: "hidden", // so the corners are rounded
    width: "100%",
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
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
