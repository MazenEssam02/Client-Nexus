import { View, Text, StyleSheet } from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import InfoInput from "./InfoInput";
import OurButton from "../../UI/OurButton";
import { useState } from "react";
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
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  if (isPassword && !editable) {
    return;
  }
  switch (field.toString()) {
    case "mobile":
      inputProps = { ...inputProps, keyboardType: "phone-pad" };
  }
  function EditableHandler() {
    if (editable) {
      if (isChangingPassword) {
        return (
          <>
            <InfoInput
              field="newPassword"
              info={newPassword}
              inputProps={{ ...inputProps, placeholder: "كلمة السر الجديدة" }}
              onChange={(f, value) => {
                if (f === "newPassword") {
                  setNewPassword(value);
                }
              }}
              isPassword={true}
            />
            <View style={styles.ButtonContainer}>
              <OurButton
                style={styles.button}
                onPress={() => {
                  // Call the onChange prop with the new password
                  onChange(field, newPassword); // 'field' will be "password" here
                  setIsChangingPassword(false);
                }}
              >
                حفظ كلمة السر الجديدة
              </OurButton>
              <OurButton
                style={styles.button}
                onPress={() => setIsChangingPassword(false)}
              >
                إلغاء
              </OurButton>
            </View>
          </>
        );
      } else {
        return (
          <>
            {!isPassword && (
              <InfoInput
                field={field}
                info={info}
                inputProps={inputProps}
                onChange={onChange}
                isPassword={isPassword}
              />
            )}
            {isPassword && (
              <OurButton
                style={{
                  padding: 5,
                  alignSelf: "center",
                }}
                onPress={() => setIsChangingPassword(true)}
              >
                تعديل كلمة السر
              </OurButton>
            )}
          </>
        );
      }
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
  ButtonContainer: {
    flexDirection: "row-reverse",
    columnGap: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    padding: 8,
    marginTop: 10,
  },
});
export default InfoDetail;
