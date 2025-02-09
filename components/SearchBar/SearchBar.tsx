import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

export default function SearchBar({ placeHolder, backgroundColor }) {
  return (
    <View style={[{ backgroundColor: backgroundColor }, styles.container]}>
      <Image source={require("../../assets/icons/Icon_Search.png")} />
      <TextInput
        style={[font.subtitle, styles.placeHolderText]}
        placeholder={placeHolder}
        placeholderTextColor={Colors.SecondaryColor}
        onPress={() => {}}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    borderStyle: "solid",
    borderColor: Colors.SecondaryColor,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 18,
    height: 40,
    width: "100%",
    alignItems: "center",
  },
  placeHolderText: {
    height: 40,
    color: Colors.SecondaryColor,
    paddingRight: 6,
    width: "100%",
    textAlign: "right",
  },
});
