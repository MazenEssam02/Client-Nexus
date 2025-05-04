import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
const IsLoading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.mainColor} />
      <Text style={styles.loadingText}>Searching...</Text>
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
export default IsLoading;
