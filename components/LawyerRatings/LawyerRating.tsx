import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import UserCard from "../UserCard/UserCard";
import { MainButton } from "../Buttons/MainButton";
import { useCallback, useState } from "react";
import RatingModal from "../RatingModal/RatingModal";
import { ServiceProvider } from "../../API/https";
import { useMutation } from "@tanstack/react-query";
export default function LawyerRatings({
  serviceProviderId,
  feedbacks,
  isDisabled = false,
  navigation,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState({
    rating: "",
    feedback: "",
  });
  const moreHandler = () => {
    navigation.navigate("LawyerRatingScreen", { feedbacks });
  };
  function modalHandler() {
    setModalVisible(!modalVisible);
  }
  const { mutate: setFeedback, reset: resetBookMutation } = useMutation({
    mutationFn: ServiceProvider.setFeedback,
    onSuccess: () => {
      resetBookMutation();
    },
    onError: (err) => {
      Alert.alert("خطأ", "برجاء المحاولة مره اخري.");
      console.error("book error:", err);
    },
  });
  const handleRatingConfirmation = useCallback(
    (rating) => {
      const data = {
        rating: rating.rating || "",
        feedback: rating.feedback,
      };
      setRating(data);
      modalHandler();
      if (rating.rating && rating.feedback) {
        setFeedback({
          serviceProviderId: serviceProviderId,
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

      <View style={styles.ratingContainer}>
        <View style={styles.ratingUpperContainer}>
          <Text style={styles.title}>تقييمات الزائرين</Text>
          {isDisabled ? (
            ""
          ) : (
            <Pressable onPress={moreHandler} style={styles.arrowContainer}>
              <Text style={styles.readMoreText}>المزيد</Text>
            </Pressable>
          )}
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
        <View style={styles.buttonContainer}>
          <MainButton
            title="تقييم المحامى"
            onPress={() => {
              modalHandler();
            }}
          />
        </View>
      </View>
    </>
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
  buttonContainer: {
    marginTop: 30,
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
