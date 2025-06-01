import { View, Text, StyleSheet, FlatList } from "react-native";
import { font } from "../constants/Font";
import { useCallback, useEffect, useState } from "react";
import FavouriteLawyerCard from "../components/LawyerCard/FavouriteLawyerCard";
import FixedButton from "../components/floatbutton/FixedButton";
import { getFavorites } from "../store/FavoritesStore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Color";
const FavouriteScreen = () => {
  const navigation = useNavigation<any>();
  const [editable, setEditable] = useState(false);
  const [LawyerList, setLawyerList] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        const newLawyerList = await getFavorites();
        setLawyerList(newLawyerList);
        console.log(newLawyerList);
      };
      fetchFavorites();
    }, [])
  );
  function pressHandler(id) {
    console.log(LawyerList.filter((lawyer) => lawyer.id === id)[0]);
    navigation.navigate("HomeStack", {
      screen: "LawyerDetails",
      params: {
        lawyer: LawyerList.filter((lawyer) => lawyer.id === id)[0],
      },
    } as any);
  }
  function editHandler() {
    console.log("clicked");
    setEditable((editable) => !editable);
  }
  if (LawyerList.length <= 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          لا يوجد تفضيلات في حسابك يمكنك البدء بأضافة التفضيلات من خلال صفحة
          المحامي
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={LawyerList}
        keyExtractor={(lawyer) => lawyer.id}
        renderItem={(lawyer) => (
          <FavouriteLawyerCard
            name={lawyer.item.firstName + " " + lawyer.item.lastName}
            rate={lawyer.item.rate}
            speciality={lawyer.item.main_Specialization}
            address={lawyer.item.city}
            editable={editable}
            id={lawyer.item.id}
            mainImage={lawyer.item.mainImage}
            onPress={pressHandler}
          />
        )}
      />
      {/* <FixedButton editable={editable} pressedHandle={editHandler} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    textAlign: "center",
    fontFamily: font.headline.fontFamily,
    fontSize: font.headline.fontSize,
    color: Colors.SecondaryColor,
  },
  icon: {
    marginRight: 10,
  },
});
export default FavouriteScreen;
