import { View, Text, StyleSheet } from "react-native";
import FavouriteLawyerCard from "../LawyerCard/FavouriteLawyerCard";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import { MainButton } from "../Buttons/MainButton";
import { Appointments } from "../../API/https";

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
        {item.status === 67 ? (
          <Text style={styles.type}>الغيت</Text>
        ) : !item.isEnded ? (
          <View style={styles.buttonContainer}>
            <MainButton
              title="الغاء"
              onPress={async () => {
                try {
                  await Appointments.cancelAppointment(item.id);
                  alert("تم الغاءالطلب بنجاح");
                } catch (error) {
                  console.error(
                    "Error cancelling request:",
                    JSON.stringify(error, null, 2)
                  );
                  alert("حدث خطأ أثناء الغاء الطلب. يرجى المحاولة مرة أخرى.");
                }
              }}
            />
          </View>
        ) : (
          <Text style={styles.type}>انتهت المقابلة</Text>
        )}
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
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    // alignItems: "flex-end",
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
    // alignItems: "flex-end",
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
  buttonContainer: {
    // alignSelf: "center",
    height: 40,
    width: 80,
  },
});

export default ScheduleLawyerCard;
