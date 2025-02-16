import { View, Text, StyleSheet } from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";

const InfoField = ({ header, info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{header}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: font.subtitle.fontFamily,
    fontSize: font.subtitle.fontSize,
    borderBottomWidth: 1,
    borderBottomColor: Colors.SecondaryColor,
    color: Colors.SecondaryColor,
  },
  info: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.mainColor,
  },
});
export default InfoField;
