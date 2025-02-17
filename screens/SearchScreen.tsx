import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Color";
import SearchBar from "../components/SearchBar/SearchBar";
import AllSpecialities from "../components/AllSpecialities/AllSpecialities";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
export default function SearchScreen() {
  const [input, setInput] = useState("");
  const navigation = useNavigation();
  function submitHandler() {
    navigation.navigate("SearchResult" as never);
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeHolder={"ابحث بالتخصص, أو اسم المحامى"}
          backgroundColor={"white"}
          onSubmitEditing={submitHandler}
        />
        <AllSpecialities />
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
