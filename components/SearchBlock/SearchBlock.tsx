import { StyleSheet, View, Text, Image } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import SearchBar from "../SearchBar/SearchBar";

export default function SearchBlock() {
  return (
    <View style={styles.container}>
      <Text style={[font.title, styles.titleText]}>أحجز استشارة قانونية</Text>
      <SearchBar
        placeHolder={"ابحث بالتخصص, أو اسم المحامى"}
        backgroundColor={Colors.background}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderStyle: "solid",
    borderColor: "black",
    marginVertical: 11,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 123,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  titleText: {
    color: Colors.SecondaryColor,
  },
});
