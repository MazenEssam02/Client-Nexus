import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
const IsError = ({ error }) => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>حدث خطأ ما</Text>
      <Text style={styles.loadingText}>{error?.message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 30,
    color: Colors.SecondaryColor,
    fontFamily: font.headline.fontFamily,
    fontSize: font.headline.fontSize,
  },
});
export default IsError;
