import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Color";
import SearchBar from "../components/SearchBar/SearchBar";
import FilterIcon from "../components/FilterIcon/FilterIcon";
import LawyerCard from "../components/LawyerCard/LawyerCard";
export default function SearchResultScreen() {
  return (
    <View style={style.main}>
      <View style={style.container}>
        <View style={style.searchBar}>
          <SearchBar
            placeHolder={"ابحث بالتخصص, أو اسم المحامى"}
            backgroundColor={"white"}
          />
        </View>
        <FilterIcon />
      </View>
      <LawyerCard />
    </View>
  );
}
const style = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    padding: 10,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    width: "80%",
    marginLeft: 10,
  },
  text: {
    color: Colors.mainColor,
  },
});
