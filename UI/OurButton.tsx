import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
const OurButton = ({ onPress = null, children, style = null }) => {
  return (
    <Pressable style={[styles.closeButton, style]} onPress={onPress}>
      <Text style={styles.closeButtonText}>{children}</Text>
    </Pressable>
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
