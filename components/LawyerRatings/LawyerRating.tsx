import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import UserCard from "../UserCard/UserCard";
import { useNavigation } from "@react-navigation/native";
export default function LawyerRatings({ feedbacks }) {
  const navigation = useNavigation();
  const moreHandler = () => {
    navigation.navigate("LawyerRatingScreen" as never, { feedbacks });
  };
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.ratingUpperContainer}>
        <Text style={styles.title}>تقييمات الزائرين</Text>
        <Pressable onPress={moreHandler} style={styles.arrowContainer}>
          <Text style={styles.readMoreText}>المزيد</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        <FlatList
          data={feedbacks.slice(0, 3)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <UserCard feedbackItem={item} />
              <View style={styles.underline}></View>
            </>
          )}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    color: Colors.SecondaryColor,
    ...font.title,
    textAlign: "right",
  },
  ratingUpperContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
  },
  arrowContainer: {
    padding: 5,
    marginHorizontal: 10,
  },
  readMoreText: {
    ...font.title,
    color: Colors.SecondaryColor,
    textDecorationLine: "underline",
  },
  list: {
    width: "100%",
  },
  underline: {
    borderTopWidth: 1,
    borderColor: Colors.background,
    marginHorizontal: 5,
  },
});
