import { View, Text, StyleSheet, FlatList } from "react-native";
import LawyerList from "../api-mock/LawyerList";
import { font } from "../constants/Font";
import { useState } from "react";
import FavouriteLawyerCard from "../components/LawyerCard/FavouriteLawyerCard";
import FixedButton from "../components/floatbutton/FixedButton";
const FavouriteScreen = () => {
  const [editable, setEditable] = useState(false);
  //const navigation = useNavigation();
  //// 1. Separate your header component from the state update logic
  //const HeaderRightButton = useCallback(() => {
  //return (
  //<Pressable
  //onPress={() => {
  //// Directly update the state here instead of using a separate handler
  //console.log("clicked");
  //setEditable((editable) => !editable);
  //}}
  //style={({ pressed }) => [styles.icon, pressed && styles.pressed]}
  //>
  //<Edit color={editable ? "black" : 'white'} size={22} />
  //<Text
  //style={[
  //{
  //fontFamily: font.subtitle.fontFamily,
  //fontSize: font.subtitle.fontSize,
  //color: 'white',
  //},
  //editable && { color: "black" },
  //]}
  //>
  //تعديل
  //</Text>
  //</Pressable>
  //);
  //}, [editable]); // Only depend on editable state

  //// 2. Use useEffect with a cleanup function to ensure proper header updates
  //useLayoutEffect(() => {
  //navigation.setOptions({
  //headerRight: () => <HeaderRightButton />,
  //});

  //// Optional cleanup function
  //return () => {
  //navigation.setOptions({
  //headerRight: undefined,
  //});
  //};
  //}, [navigation, HeaderRightButton, editable]);
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
    <View>
      <FlatList
        data={LawyerList}
        keyExtractor={(lawyer) => lawyer.id}
        renderItem={(lawyer) => (
          <FavouriteLawyerCard
            name={lawyer.item.name}
            rate={lawyer.item.rate}
            speciality={lawyer.item.speciality}
            address={lawyer.item.address}
            editable={editable}
            id={lawyer.item.id}
          />
        )}
      />
      <FixedButton editable={editable} pressedHandle={editHandler} />
    </View>
  );
};
const styles = StyleSheet.create({
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
  },
  icon: {
    marginRight: 10,
  },
});
export default FavouriteScreen;
