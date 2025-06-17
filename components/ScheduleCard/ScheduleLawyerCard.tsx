import { View, Text, StyleSheet } from "react-native";
import FavouriteLawyerCard from "../LawyerCard/FavouriteLawyerCard";

const ScheduleLawyerCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.dateContainer}>
        <Text style={styles.day}>{item.day}</Text>
        <Text style={styles.day}>{item.type}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <FavouriteLawyerCard {...item} isDisabled={true} />
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
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
  time: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  dateContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
  },
  day: {
    fontSize: 14,
    color: "#AA7722",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
});

export default ScheduleLawyerCard;
