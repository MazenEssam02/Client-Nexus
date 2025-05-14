import { StyleSheet, View, Text, Alert, Linking } from "react-native";
import { Colors } from "../../constants/Color";
import { BookingPicker } from "../BookingPicker/BookingPicker";
import { font } from "../../constants/Font";
import { MainButton } from "../Buttons/MainButton";

import Wallet from "../Icons/Wallet";

export default function EmergencyDetailsBlock({ title, description }) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.bookInfoInnerContainer}>
        <Text style={styles.titleText}> {title}</Text>
        <Text style={styles.descriptionText}>
          تفاصيل المشكلة: {description}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "white",
    marginBottom: 5,
    // height: 110,
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  bookInfoInnerContainer: {
    width: "100%",
    // alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  titleText: {
    color: Colors.SecondaryColor,
    ...font.title,
    textAlign: "center",
  },
  descriptionText: {
    textAlign: "right",
    color: Colors.SecondaryColor,
    ...font.body,
  },
});
