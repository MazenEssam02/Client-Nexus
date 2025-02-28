import { View, StyleSheet, Pressable, Text } from "react-native";
import Modal from "react-native-modal";
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
      isVisible={modalVisible}
      animationInTiming={300}
      animationOut="slideOutDown"
      animationOutTiming={300}
      swipeDirection="down"
      onBackdropPress={modalHandler}
      onSwipeComplete={modalHandler}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.handle} />
        <OurButton onPress={selectImage}>اختار من المعرض</OurButton>
        <OurButton onPress={takePhoto}>التقط صورة جديدة</OurButton>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    minHeight: 300,
    backgroundColor: Colors.background,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
