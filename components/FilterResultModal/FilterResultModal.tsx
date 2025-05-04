import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import DropdownList from "../DropdownList/DropdownList";
import OurButton from "../../UI/OurButton";

const FilterResultModal = ({ modalVisible, modalHandler, onFilter }) => {
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const [rate, setRate] = useState(null);
  const handleCityChange = useCallback((value) => {
    setCity(value);
  }, []);
  const handleRegionChange = useCallback((value) => {
    setRegion(value);
  }, []);
  const handleSpecialityChange = useCallback((value) => {
    setSpeciality(value);
  }, []);
  const handleRateChange = useCallback((value) => {
    setRate(value);
  }, []);
  const handleConfirmFilter = useCallback(() => {
    const filters = {
      city: city,
      state: region,
      rate: rate,
      speciality: speciality,
    };
    onFilter(filters);
    modalHandler();
  }, [modalHandler, onFilter, region, speciality, rate, city]);
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
            <Text style={styles.title}>تحديد النتائج</Text>
            <DropdownList
              placeholder="المدينة"
              onValueChange={handleCityChange}
            />
            <DropdownList
              placeholder="اختار المنطقة"
              onValueChange={handleRegionChange}
            />
            <DropdownList
              placeholder="التخصص"
              onValueChange={handleSpecialityChange}
            />
            <DropdownList
              placeholder="التقييم"
              onValueChange={handleRateChange}
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
    justifyContent: "flex-end",
  },
  modalContent: {
    minHeight: 500,
    backgroundColor: Colors.background,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderBottomWidth: 0,
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
});

export default FilterResultModal;
