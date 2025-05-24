import { View, StyleSheet, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../constants/Color";
import UserCard from "../components/UserCard/UserCard";
import { font } from "../constants/Font";

export default function LawyerRatingsScreen() {
  const route = useRoute<{
    key: string;
    name: string;
    params: { feedbacks: Array<{ id: string }> };
  }>();
  const { feedbacks } = route.params;
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.list}>
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <UserCard feedbackItem={item} />
              <View style={styles.underline}></View>
            </>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: "white",
    flex: 1,
    // padding: 15,
    // justifyContent: "center",
    // alignItems: "flex-end",
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
