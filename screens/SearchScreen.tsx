import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../constants/Color";
import SearchBar from "../components/SearchBar/SearchBar";
import AllSpecialities from "../components/AllSpecialities/AllSpecialities";
import { useState } from "react";
import { Specialization } from "../API/https";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import IsError from "../components/IsError/IsError";

export default function SearchScreen({ navigation, route }) {
  const type = route.params === undefined ? true : route.params.type;
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
    return <LoadingSpinner />;
  }

  if (isError) {
    return <IsError error={error} />;
  }

  function submitHandler() {
    navigation.navigate("SearchResult" as never, {
      requestName: input,
      type: type,
    });
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
        <AllSpecialities specialities={specialities.data.data} type={type} />
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
