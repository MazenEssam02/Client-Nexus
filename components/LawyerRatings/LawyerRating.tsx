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
  serviceProviderId = null,
  feedbacks,
  feedbacksQuery = null,
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
      Alert.alert("تأكيد", "تم اضافة تقييمك بنجاح");
      feedbacksQuery.refetch();
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
            <Pressable onPress={modalHandler} style={styles.arrowContainer}>
              <Text style={styles.readMoreText}> اضافة تقييم</Text>
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
        {isDisabled ? (
          ""
        ) : (
          <View style={styles.buttonContainer}>
            <MainButton
              title="عرض المزيد"
              onPress={() => {
                moreHandler();
              }}
            />
          </View>
        )}
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
