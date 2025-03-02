import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";
import { useState } from "react";
import InfoDetail from "./InfoDetail";
const InfoArea = ({ editable }) => {
  const [info, setInfo] = useState({
    name: {
      header: "الاسم",
      value: "جورج جيهام وليم",
    },
    email: {
      header: "البريد الالكتروني",
      value: "George25geham@gmail.com",
    },
    mobile: {
      header: "التليفون",
      value: "01210268324",
    },
    birthday: {
      header: "تاريخ الميلاد",
      value: "15/7/2001",
    },
    password: {
      header: "كلمة السر",
      value: "123456789",
    },
  });
  function changeHandler(field, text) {
    setInfo((info) => ({
      ...info,
      [field]: { ...info[field], value: text },
    }));
  }
  return (
    <View style={styles.infoContainer}>
      {Object.keys(info).map((key) => (
        <InfoDetail
          key={key}
          field={key}
          header={info[key].header}
          info={info[key].value}
          editable={editable}
          onChange={changeHandler}
          isPassword={key === "password"}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    borderBottomColor: Colors.SecondaryColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginVertical: 10,
  },
});
export default InfoArea;
