import { View, Text, StyleSheet, TextInput } from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import InfoInput from "./InfoInput";
const InfoDetail = ({
  field,
  header,
  info,
  editable,
  onChange,
  isPassword,
}) => {
  let inputProps = {
    keyboardType: "default",
  };
  if (isPassword && !editable) {
    return;
  }
  switch (field.toString()) {
    case "mobile":
      inputProps = { ...inputProps, keyboardType: "phone-pad" };
  }
  function EditableHandler() {
    if (editable) {
      return (
        <InfoInput
          field={field}
          info={info}
          inputProps={inputProps}
          onChange={onChange}
        />
      );
    }
    return <Text style={styles.info}>{info}</Text>;
  }
  return (
    <View style={[styles.container, editable && { marginVertical: 2 }]}>
      <Text style={styles.title}>{header}</Text>
      <EditableHandler />
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
export default InfoDetail;
