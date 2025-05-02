import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
} from "react-native";
import { Colors } from "../constants/Color";
import SearchBar from "../components/SearchBar/SearchBar";
import FilterIcon from "../components/FilterIcon/FilterIcon";
import ResultLawyerCard from "../components/LawyerCard/LawyerCard";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import FilterResultModal from "../components/FilterResultModal/FilterResultModal";
import api from "../utils/config";
import { font } from "../constants/Font";
export default function SearchResultScreen({ route, navigation }) {
  const initialSearchText = route?.params?.requestName;
  const [modalVisible, setModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState(initialSearchText || "");
  const [loading, setLoading] = useState(false);
  const [noResponse, setNoResponse] = useState(true);
  function modalHandler() {
    setModalVisible(!modalVisible);
  }
  async function search(text) {
    setLoading(true);
    setNoResponse(false);
    try {
      const result = await axios.get(
        "http://clientnexus.runasp.net/api/ServiceProvider/Search",
        {
          params: {
            searchQuery: text,
          },
        }
      );
      if (result.data && result.data.data) {
        setNoResponse(false);
        setSearchResults(result.data.data);
        console.log(searchResults);
      } else {
        setNoResponse(true);
        setSearchResults([]);
      }
    } catch (error) {
      console.log(error);
      setNoResponse(true);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }
  useLayoutEffect(() => {
    console.log(initialSearchText);
    if (initialSearchText) {
      setSearchText(initialSearchText);
      search(initialSearchText);
    }
  }, [initialSearchText]);
  function handleSearchBar(event) {
    console.log(event.nativeEvent.text);
    setSearchText(event.nativeEvent.text);
    console.log(searchText);
    search(event.nativeEvent.text);
  }
  return (
    <>
      {modalVisible && (
        <FilterResultModal
          modalVisible={modalVisible}
          modalHandler={modalHandler}
        />
      )}
      <View style={style.main}>
        <View style={style.container}>
          <View style={style.searchBar}>
            <SearchBar
              placeHolder={searchText}
              backgroundColor={"white"}
              onSubmitEditing={handleSearchBar}
            />
          </View>
          <FilterIcon onPress={modalHandler} />
        </View>
        {noResponse ? (
          <View style={style.loadingContainer}>
            <Text style={style.loadingText}>لا توجد نتائج للبحث</Text>
          </View>
        ) : (
          ""
        )}
        {loading ? (
          <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.mainColor} />
            <Text style={style.loadingText}>Searching...</Text>
          </View>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(lawyer) => lawyer.id.toString()}
            renderItem={({ item: lawyer }) => (
              <ResultLawyerCard
                name={lawyer.firstName}
                rate={lawyer.rate}
                speciality={lawyer.specializationName?.[0]}
                vezita={lawyer.office_consultation_price}
                address={lawyer.city}
                imageURL={lawyer.mainImage}
                onPress={() =>
                  navigation.navigate(
                    "LawyerDetails" as never,
                    {
                      lawyerid: lawyer.id,
                    } as never
                  )
                }
              />
            )}
          />
        )}
      </View>
    </>
  );
}
const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.background,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 30,
    color: Colors.SecondaryColor,
    fontFamily: font.headline.fontFamily,
    fontSize: font.headline.fontSize,
  },
});
