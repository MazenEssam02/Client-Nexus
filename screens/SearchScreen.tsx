import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Color";
import SearchBar from "../components/SearchBar/SearchBar";
import AllSpecialities from "../components/AllSpecialities/AllSpecialities";
import { useState } from "react";
export default function SearchScreen({ navigation }) {
  const [input, setInput] = useState("");
  function submitHandler() {
    navigation.navigate("SearchResult" as never, { requestName: input });
  }
  function getText(text) {
    setInput(text);
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeHolder={"ابحث بالتخصص, أو اسم المحامى"}
          backgroundColor={"white"}
          onSubmitEditing={submitHandler}
          onChangeText={getText}
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
