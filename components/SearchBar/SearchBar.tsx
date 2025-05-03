import { StyleSheet, Image, TextInput, Pressable } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useState } from "react";
import { Search } from "../Icons/Search";

export default function SearchBar({
  placeHolder = null,
  backgroundColor,
  onPress = null,
  iseditable = true,
  onSubmitEditing = null,
  onChangeText = null,
}) {
  const [placeHolderText, setPlaceHolderText] = useState(placeHolder);
  return (
    <Pressable
      style={[{ backgroundColor: backgroundColor }, styles.container]}
      onPress={onPress} //work only on android
    >
      <Search stroke={null} fill={Colors.SecondaryColor} />
      <TextInput
        style={[font.subtitle, styles.placeHolderText]}
        placeholder={placeHolderText}
        placeholderTextColor={Colors.SecondaryColor}
        editable={iseditable}
        onPress={onPress} //work only on ios
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        onBlur={() => setPlaceHolderText(placeHolder)}
        onFocus={() => {
          setPlaceHolderText("");
        }}
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
