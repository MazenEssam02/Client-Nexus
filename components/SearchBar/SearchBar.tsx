import { StyleSheet, Image, TextInput, Pressable } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

export default function SearchBar({
  placeHolder,
  backgroundColor,
  onPress = null,
  iseditable = true,
}) {
  return (
    <Pressable
      style={[{ backgroundColor: backgroundColor }, styles.container]}
      onPress={onPress} //work only on android
    >
      <Image source={require("../../assets/icons/Icon_Search.png")} />
      <TextInput
        style={[font.subtitle, styles.placeHolderText]}
        placeholder={placeHolder}
        placeholderTextColor={Colors.SecondaryColor}
        editable={iseditable}
        onPress={onPress} //work only on ios
      />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    borderStyle: "solid",
    borderColor: Colors.SecondaryColor,
    borderWidth: 1,
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
    width: "90%",
    textAlign: "right",
  },
});
