import { View, Text, StyleSheet, Alert } from "react-native";
import FavouriteLawyerCard from "../LawyerCard/FavouriteLawyerCard";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import { MainButton } from "../Buttons/MainButton";
import { Appointments, ServiceProvider } from "../../API/https";
import { useCallback, useEffect, useState } from "react";
import isCheckedFeedback from "../../store/isCheckedFeedback";
import { useMutation } from "@tanstack/react-query";
import RatingModal from "../RatingModal/RatingModal";

const ScheduleLawyerCard = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState({
    rating: "",
    feedback: "",
  });
  console.log(item);
  // console.log("hello");
  useEffect(() => {
    const checkFeedback = async () => {
      if (item.isCompletedForFeedback) {
        setModalVisible(!(await isCheckedFeedback(item.id)));
      }
    };
    checkFeedback();
  }, [item]);

  function modalHandler() {
    setModalVisible(!modalVisible);
  }
  const { mutate: setFeedback, reset: resetBookMutation } = useMutation({
    mutationFn: ServiceProvider.setFeedback,
    onSuccess: () => {
      resetBookMutation();
      Alert.alert("تأكيد", "تم اضافة تقييمك بنجاح");
    },
    onError: (err) => {
      Alert.alert("خطأ", "برجاء المحاولة مره اخري.");
      console.error("rating error:", err);
    },
  });
  const handleRatingConfirmation = useCallback(
    (rating) => {
      const data = {
        rating: rating.rating || "",
        feedback: rating.feedback,
      };
      setRating(data);
      if (rating.rating && rating.feedback) {
        modalHandler();
        setFeedback({
          serviceProviderId: item.serviceProviderId,
          rate: rating.rating,
          feedback: rating.feedback,
        });
      }
    },
    [setRating, modalHandler]
  );

  return (
    <>
      {modalVisible && (
        <RatingModal
          modalVisible={modalVisible}
          modalHandler={modalHandler}
          onRating={handleRatingConfirmation}
        />
      )}
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
                    await Appointments.finishAppointment({
                      id: item.id,
                      status: 67,
                      reason: "الغاء",
                    });
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
    </>
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
