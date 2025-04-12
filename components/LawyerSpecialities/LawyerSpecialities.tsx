import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { Arrow } from "../Icons/Arrow";
import { useState } from "react";
export default function LawyerSpecialities({ lawyer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <View style={styles.specialitiesContainer}>
      <View style={styles.specialitiesUpperContainer}>
        <Text style={styles.title}>تخصصات اخرى</Text>
        <Pressable onPress={toggleExpand} style={styles.arrowContainer}>
          <Arrow
            fillColor={Colors.mainColor}
            rotation={isExpanded ? 90 : 270}
          />
        </Pressable>
      </View>
      {isExpanded ? (
        <View style={styles.list}>
          {lawyer.otherSpecialities.map((speciality, index) => (
            <View key={index} style={styles.specialitiyItem}>
              <Text style={styles.specialityText}>{speciality}</Text>
            </View>
          ))}
        </View>
      ) : (
        ""
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  specialitiyItem: {
    borderColor: Colors.SecondaryColor,
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: "dashed",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  specialityText: {
    ...font.subtitle,
    color: Colors.SecondaryColor,
  },
  specialitiesContainer: {
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
  specialitiesUpperContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
  },
  arrowContainer: {
    padding: 5,
    marginHorizontal: 10,
  },
  list: {
    width: "100%",
    flexDirection: "row-reverse",
    padding: 10,
    flexWrap: "wrap",
    gap: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
