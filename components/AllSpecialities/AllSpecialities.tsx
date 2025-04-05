import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import specialities from "../../api-mock/specialities.json";
import SpecialitiyItem from "../SpecialityItem/SpecialityItem";
export default function AllSpecialities() {
  return (
    <View style={styles.container}>
      {/* <Text style={[font.title, styles.titleText]}>
        التخصصات الاكثر اختيارا
      </Text> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={specialities.specialities}
        keyExtractor={(item) => item.speciality_id}
        renderItem={({ item }) =>
          item.isHeader ? (
            <View style={styles.titleContainer}>
              <Text style={[font.title, styles.titleText]}>
                {item.speciality_name}
              </Text>
            </View>
          ) : (
            <SpecialitiyItem text={item.speciality_name} />
          )
        }
        stickyHeaderIndices={[0, 8]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 11,
  },
  titleContainer: {
    height: 48,

    backgroundColor: Colors.background,
    justifyContent: "center",
  },
  titleText: {
    color: Colors.SecondaryColor,
    textAlign: "right",
    textAlignVertical: "center",
  },
});
