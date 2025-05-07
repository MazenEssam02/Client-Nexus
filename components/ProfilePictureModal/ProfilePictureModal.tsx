import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../../constants/Color";
import OurButton from "../../UI/OurButton";

const ProfilePictureModal = ({
  modalVisible,
  modalHandler,
  selectImage,
  takePhoto,
}) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={modalHandler}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={modalHandler}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <View style={styles.handle} />
          <OurButton onPress={selectImage}>اختار من المعرض</OurButton>
          <OurButton onPress={takePhoto}>التقط صورة جديدة</OurButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    minHeight: 300,
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
});

export default ProfilePictureModal;
