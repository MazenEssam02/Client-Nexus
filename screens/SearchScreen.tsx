import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/Color";
import SearchBar from "../components/SearchBar/SearchBar";
import AllSpecialities from "../components/AllSpecialities/AllSpecialities";
import { useState } from "react";
import { Specialization } from "../API/https";
import { useQuery } from "@tanstack/react-query";

export default function SearchScreen({ navigation }) {
  const [input, setInput] = useState("");
  const {
    data: specialities,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["specialization"],
    queryFn: Specialization.getAll,
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

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
        <AllSpecialities specialities={specialities.data.data} />
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
