import { View, StyleSheet, FlatList } from "react-native";
import { Colors } from "../constants/Color";
import SearchBar from "../components/SearchBar/SearchBar";
import FilterIcon from "../components/FilterIcon/FilterIcon";
import LawyerCard from "../components/LawyerCard/LawyerCard";
import LawyerList from "../api-mock/LawyerList";
import { useState } from "react";
import FilterResultModal from "../components/FilterResultModal/FilterResultModal";
export default function SearchResultScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  function modalHandler() {
    setModalVisible(!modalVisible);
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
              placeHolder={"ابحث بالتخصص, أو اسم المحامى"}
              backgroundColor={"white"}
            />
          </View>
          <FilterIcon onPress={modalHandler} />
        </View>
        <FlatList
          data={LawyerList}
          keyExtractor={(lawyer) => lawyer.id}
          renderItem={(lawyer) => (
            <LawyerCard
              name={lawyer.item.name}
              rate={lawyer.item.rate}
              speciality={lawyer.item.speciality}
              vezita={lawyer.item.vezita}
              address={lawyer.item.address}
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
