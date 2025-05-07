import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";
import InfoDetail from "./InfoDetail";
const InfoArea = ({ editable, info, onChange }) => {
  return (
    <View style={styles.infoContainer}>
      {Object.keys(info).map((key) => (
        <InfoDetail
          key={key}
          field={key}
          header={info[key].header}
          info={info[key].value}
          editable={editable}
          onChange={(field, text) =>
            onChange({ ...info, [field]: { ...info[field], value: text } })
          }
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
