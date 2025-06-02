import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
const OurButton = ({ onPress = null, children, style = null }) => {
  return (
    <TouchableOpacity
      style={[styles.closeButton, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.closeButtonText}>{children}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: Colors.mainColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  closeButtonText: {
    color: Colors.background,
    fontFamily: font.headline.fontFamily,
    fontSize: font.headline.fontSize,
  },
});
export default OurButton;
