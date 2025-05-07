import { View, StyleSheet, FlatList } from "react-native";

import { Colors } from "../constants/Color";
import SearchBar from "../components/SearchBar/SearchBar";
import FilterIcon from "../components/FilterIcon/FilterIcon";
import ResultLawyerCard from "../components/LawyerCard/LawyerCard";
import { useCallback, useLayoutEffect, useState } from "react";
import FilterResultModal from "../components/FilterResultModal/FilterResultModal";
import { font } from "../constants/Font";

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { ServiceProvider } from "../API/https";
import { useQuery } from "@tanstack/react-query";
import IsLoading from "../components/IsLoading/IsLoading";
import IsError from "../components/IsError/IsError";
import NoResponse from "../components/NoResponse/NoResponse";
export default function SearchResultScreen({ route, navigation }) {
  const initialSearchText = route?.params?.requestName;
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState(initialSearchText || "");
  const [filterUsed, setFilterUsed] = useState(false);
  const [filterData, setFilterData] = useState({
    searchQuery: "",
    minRate: "",
    state: "",
    city: "",
    specializationName: "",
  });
  const {
    data: searchResultsData,
    isLoading: searchIsLoading,
    isError: searchIsError,
    error: searchError,
  } = useQuery({
    queryKey: ["Lawyers", searchText],
    queryFn: () => ServiceProvider.getBySearch(searchText),
    enabled: !!searchText,
  });
  const searchResults = searchResultsData?.data?.data || [];
  const noResponse =
    !searchIsLoading && !searchIsError && searchResults.length === 0;
  function modalHandler() {
    setModalVisible(!modalVisible);
  }

  useLayoutEffect(() => {
    if (initialSearchText) {
      setSearchText(initialSearchText);
    }
  }, [initialSearchText]);
  function handleSearchBar(event) {
    setSearchText(event.nativeEvent.text);
  }
  //Handle Filteration Confirmation
  const handleFilterConfirmation = useCallback(
    (filters) => {
      const data = {
        searchQuery: searchText,
        minRate: filters.rate || "",
        state: filters.region || "",
        city: filters.city || "",
        specializationName: filters.speciality || "",
      };
      setFilterData(data);
      setFilterUsed(true);
      console.log("handleFilterConfirmation:", data);
      modalHandler();
    },
    [searchText, setFilterData, modalHandler]
  );
  const {
    data: filteredSearchResult,
    isLoading: filteredIsLoading,
    isError: filterIsError,
    error: filterError,
  } = useQuery({
    queryKey: ["filteredResults", filterData],
    queryFn: () => {
      console.log("filter queryFn called", filterData); // <--- Add this line
      return ServiceProvider.filter({ filterData })
        .then((response) => {
          console.log("filter queryFn success", response);
          return response; // Important: Return the response!
        })
        .catch((err) => {
          console.error("filter queryFn error", err);
          throw err; // Important: Re-throw the error!
        })
        .finally(() => console.log("filter queryFn finished"));
    },
    enabled:
      !!filterData.city ||
      !!filterData.minRate ||
      !!filterData.specializationName ||
      !!filterData.state,
  });
  const lawyersToDisplay = filterUsed
    ? filteredSearchResult?.data?.data || []
    : searchResults;
  const noResponseToShow = filterUsed
    ? !filteredIsLoading &&
      !filterIsError &&
      (filteredSearchResult?.data?.data?.length || 0) === 0
    : noResponse;
  if (searchIsLoading && searchText) {
    return <LoadingSpinner />;
  }
  if (searchIsError && searchText) {
    return <IsError error={searchError} />;
  }
  if (filteredIsLoading && searchText) {
    return <IsLoading />;
  }
  if (filterIsError && searchText) {
    return <IsError error={filterError} />;
  }
  return (
    <>
      {modalVisible && (
        <FilterResultModal
          modalVisible={modalVisible}
          modalHandler={modalHandler}
          onFilter={handleFilterConfirmation}
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
        {noResponseToShow && searchText ? (
          <NoResponse text="لا توجد نتائج للبحث" />
        ) : (
          ""
        )}

        <FlatList
          data={lawyersToDisplay}
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
                    lawyer: lawyer,
                    type: route.params.type,
                  } as never
                )
              }
            />
          )}
        />
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
