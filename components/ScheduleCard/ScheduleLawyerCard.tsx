import { View, Text, Image, StyleSheet } from "react-native";
import { Rate1 } from "../Icons/Rate1";
import { Rate2 } from "../Icons/Rate2";
import { Rate3 } from "../Icons/Rate3";
import { Rate4 } from "../Icons/Rate4";
import { Rate5 } from "../Icons/Rate5";
import FavouriteLawyerCard from "../LawyerCard/FavouriteLawyerCard";

const ScheduleLawyerCard = ({ item }) => {
  function RateHandler() {
    switch (item.rate) {
      case 1:
        return <Rate1 />;
      case 2:
        return <Rate2 />;
      case 3:
        return <Rate3 />;
      case 4:
        return <Rate4 />;
      case 5:
        return <Rate5 />;
    }
  }
  return (
    <View style={styles.card}>
      <View style={styles.dateContainer}>
        <Text style={styles.day}>{item.day}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <FavouriteLawyerCard {...item} />
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
