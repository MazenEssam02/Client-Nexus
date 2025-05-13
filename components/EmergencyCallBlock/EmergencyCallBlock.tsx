import { StyleSheet, View, Text, Alert, Linking } from "react-native";
import { Colors } from "../../constants/Color";
import { BookingPicker } from "../BookingPicker/BookingPicker";
import { font } from "../../constants/Font";
import { MainButton } from "../Buttons/MainButton";

import Wallet from "../Icons/Wallet";

export default function EmergencyCallBlock({ lawyer, lawyerPhone }) {
  const onSubmitHandler = async () => {
    const url = `tel:${lawyerPhone}`;
    // Check if the device supports calling
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url); // Initiate the call
    } else {
      console.error("Phone calls are not supported on this device.");
    }
  };

  return (
    <View style={styles.bookingContainer}>
      <View style={{ width: "100%" }}>
        <View style={styles.bookInfoOuterContainer}>
          <View style={styles.bookInfoInnerContainer}>
            <Wallet />
            <Text style={styles.Text}>السعر : {lawyer.Price}ج</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton title="الاتصال بالمحامى" onPress={onSubmitHandler} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bookingContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    // height: 110,
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    width: "90%",
    height: 50,
    justifyContent: "center",
  },
  bookInfoOuterContainer: {
    height: 50,
    width: "100%",
    // borderBottomColor: Colors.SecondaryColor,
    // borderBottomWidth: 0.5,
    justifyContent: "center",
  },
  bookInfoInnerContainer: {
    // flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  Text: {
    paddingRight: 10,
    color: Colors.SecondaryColor,
    ...font.headline,
  },
  buttonContainer: {
    marginTop: 20,
    // marginBottom: 10,
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
