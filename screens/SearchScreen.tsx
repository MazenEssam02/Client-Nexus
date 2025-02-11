import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Color";
import SearchBar from "../components/SearchBar/SearchBar";
import MostPickedSpecialities from "../components/MostPickedSpecialities/MostPickedSpecialities";
export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeHolder={"ابحث بالتخصص, أو اسم المحامى"}
          backgroundColor={"white"}
        />
        <MostPickedSpecialities />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: "column",
    paddingTop: 15,
    borderRadius: 15,
    width: "100%",
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
});
