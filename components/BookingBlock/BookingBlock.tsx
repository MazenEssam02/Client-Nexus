import { StyleSheet, View, Text, Alert } from "react-native";
import { Colors } from "../../constants/Color";
import { BookingPicker } from "../BookingPicker/BookingPicker";
import { font } from "../../constants/Font";
import { MainButton } from "../Buttons/MainButton";
import Pin from "../Icons/Pin";
import Wallet from "../Icons/Wallet";
import { useNavigation } from "@react-navigation/native";
import BookingSlotsPicker from "../BookingSlotsPicker/BookingSlotsPicker";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Appointments } from "../../API/https";
import IsError from "../IsError/IsError";

export default function BookingBlock({ type, onChange, lawyer }) {
  //type: 73->offline 80-> online
  const typeNo = type ? 73 : 80;
  const navigation = useNavigation();
  const [slot, setSlot] = useState(null);
  const { mutate: bookAppointment, reset: resetBookMutation } = useMutation({
    mutationFn: Appointments.bookAppointment,
    onSuccess: () => {
      resetBookMutation();
      // if (!type) navigation.navigate("WebView" as never);
      // else
      Alert.alert(
        "نجحت العملية",
        "تم حجز الموعد بنجاح!",
        [
          {
            text: "العودة إلى الصفحة الرئيسية",
            onPress: () => {
              resetBookMutation();
              navigation.popToTop();
            },
          },
        ],
        { cancelable: false }
      );
    },
    onError: (err) => {
      Alert.alert("خطأ", "برجاء المحاولة مره اخري.");
      console.error("book error:", err);
    },
  });
  const onSubmitHandler = () => {
    if (slot) {
      bookAppointment(slot);
    } else Alert.alert("خطأ", "يجب اختيار موعد!");
  };
  console.log(slot);
  return (
    <View style={styles.bookingContainer}>
      <View style={styles.pickerContainer}>
        <BookingPicker value={type} onChange={onChange} setSlot={setSlot} />
      </View>

      {type ? (
        <View style={{ width: "100%" }}>
          <View style={styles.bookInfoOuterContainer}>
            <View style={styles.bookInfoInnerContainer}>
              <Wallet />
              <Text style={[font.subtitle, styles.Text]}>
                سعر الاستشارة : {lawyer.office_consultation_price}ج
              </Text>
            </View>
          </View>
          <View style={styles.bookInfoOuterContainer}>
            <View style={styles.bookInfoInnerContainer}>
              <Pin />
              <Text style={[font.subtitle, styles.Text]}>
                العنوان : {lawyer.city}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          <View style={styles.bookInfoOuterContainer}>
            <View style={styles.bookInfoInnerContainer}>
              <Wallet />
              <Text style={[font.subtitle, styles.Text]}>
                سعر الاستشارة : {lawyer.telephone_consultation_price}ج
              </Text>
            </View>
          </View>
        </View>
      )}
      <View style={{ flex: 1, width: "100%" }}>
        <BookingSlotsPicker
          setSlot={setSlot}
          typeNo={typeNo}
          spId={lawyer.id}
        />
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          title="حجز استشارة"
          onPress={() => {
            onSubmitHandler();
          }}
        />
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
    borderBottomColor: Colors.SecondaryColor,
    borderBottomWidth: 0.5,
    justifyContent: "center",
  },
  bookInfoInnerContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  Text: {
    paddingRight: 10,
    color: Colors.SecondaryColor,
  },
  buttonContainer: {
    marginTop: 20,
    // marginBottom: 10,
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
