import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import DropdownList from "../DropdownList/DropdownList";
import OurButton from "../../UI/OurButton";

const FilterResultModal = ({ modalVisible, modalHandler }) => {
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
        <Text style={styles.title}>تحديد النتائج</Text>
        <DropdownList placeholder="اختار المنطقة" />
        <DropdownList placeholder="التخصص" />
        <DropdownList placeholder="التقييم" />
        <OurButton onPress={modalHandler}>التأكيد</OurButton>
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
    minHeight: 500,
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
