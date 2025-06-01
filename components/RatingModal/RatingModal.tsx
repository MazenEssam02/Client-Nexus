import React, { useCallback, useLayoutEffect, useState } from "react";
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
import DropdownList from "../DropdownList/DropdownList";
import OurButton from "../../UI/OurButton";

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
    modalHandler();
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
            <DropdownList
              placeholder="التقييم"
              onValueChange={handleRatingChange}
            />

            <TextInput
              style={[styles.inputItem, styles.inputMultiLine]}
              // value={feedback}
              placeholderTextColor={Colors.gray500}
              placeholder="تعليق"
              textAlign="right"
              onChangeText={handleFeedbackChange}
            />

            <OurButton onPress={handleConfirmFilter}>التأكيد</OurButton>
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
    minHeight: 500,
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
    textAlignVertical: "bottom",
    minHeight: 150,
  },
});

export default RatingModal;
