import { View, Text, StyleSheet } from "react-native";
import FavouriteLawyerCard from "../LawyerCard/FavouriteLawyerCard";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";

const ScheduleLawyerCard = ({ item }) => {
  // console.log(item);
  // console.log("hello");
  return (
    <View style={styles.card}>
      <View style={styles.dateContainer}>
        <Text style={styles.day}>{item.day}</Text>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <FavouriteLawyerCard {...item} isDisabled={true} />
      <View style={styles.typeContainer}>
        <Text style={styles.type}>{item.type}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row-reverse",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginEnd: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  specialization: {
    fontSize: 14,
    color: "#777",
    marginVertical: 4,
  },
  stars: {
    flexDirection: "row",
    marginVertical: 4,
  },
  type: {
    marginTop: 5,
    ...font.body,
    color: Colors.mainColor,
    textAlign: "center",
  },
  typeContainer: {
    //   alignItems: "center",
    // backgroundColor: "red",
  },
  time: {
    textAlign: "center",
    // fontSize: 16,
    fontFamily: font.body.fontFamily,
    color: Colors.mainColor,
  },
  dateContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  day: {
    ...font.body,
    color: Colors.mainColor,
  },
  date: {
    ...font.body,
    color: Colors.gray500,
  },
});

export default ScheduleLawyerCard;
