import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import StarRating from "../StarRating/StarRating";
import { MainButton } from "../Buttons/MainButton";

const RatingModal = ({ modalVisible, modalHandler, onRating }) => {
  const [rating, setrating] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleRatingChange = useCallback((value) => {
    setrating(value);
  }, []);
  const handleFeedbackChange = useCallback((value) => {
    setFeedback(value);
  }, []);

  const handleConfirmFilter = useCallback(() => {
    const rate = {
      rating: rating,
      feedback: feedback,
    };
    onRating(rate);
  }, [modalHandler, onRating, rating, feedback]);
  const handleModalClose = useCallback(() => {
    modalHandler();
  }, [modalHandler]);
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={modalHandler}
    >
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.handle} />
            <Text style={styles.title}>تقييم</Text>
            <View style={styles.starContainer}>
              <StarRating
                setRating={handleRatingChange}
                rating={rating}
                starSize={45}
              />
            </View>
            {/* <DropdownList
              placeholder="التقييم"
              onValueChange={handleRatingChange}
            /> */}

            <TextInput
              style={[styles.inputItem, styles.inputMultiLine]}
              // value={feedback}
              placeholderTextColor={Colors.gray500}
              placeholder="تعليق"
              textAlign="right"
              onChangeText={handleFeedbackChange}
              multiline={true}
            />
            <View style={styles.buttonContainer}>
              <MainButton onPress={handleConfirmFilter} title="التأكيد" />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
  },
  modalContent: {
    minHeight: 470,
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.mainColor,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: Colors.mainColor,
    borderRadius: 2.5,
    alignSelf: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
    alignSelf: "center",
    marginBottom: 10,
    borderBottomColor: Colors.mainColor,
    padding: 5,
    borderBottomWidth: 2,
  },
  starContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  inputItem: {
    color: Colors.SecondaryColor,
    backgroundColor: "white",
    ...font.title,
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: Colors.mainColor,
    borderWidth: 1,
  },
  inputMultiLine: {
    minHeight: 180,
  },
  buttonContainer: {
    marginTop: 30,
    alignSelf: "center",
    height: 40,
    width: "70%",
  },
});

export default RatingModal;
