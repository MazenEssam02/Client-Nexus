import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import specialities from "../../api-mock/specialities.json";
import SpecialitiyItem from "../SpecialityItem/SpecialityItem";
export default function AllSpecialities({ specialities, type }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>جميع التخصصات</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={specialities}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SpecialitiyItem text={item.name} index={index} type={type} />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 11,
    marginBottom: 100,
  },
  titleContainer: {
    flexDirection: "row-reverse",
    height: 48,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleText: {
    color: Colors.SecondaryColor,

    ...font.title,
  },
});
