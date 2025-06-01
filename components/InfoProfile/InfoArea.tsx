import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import useProfileStore from "../../store/Profile";
const InfoArea = ({ editable }) => {
  const profileData = useProfileStore((state) => state.profileData);
  return (
    <View>
      {Object.entries(profileData).map(([key, val]) => {
        if (key === "password") return;
        return (
          <View
            key={key}
            style={[styles.container, editable && { marginVertical: 2 }]}
          >
            <Text style={styles.title}>{val.header}</Text>
            <Text style={styles.info}>{val.value}</Text>
          </View>
        );
      })}
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
export default InfoArea;
