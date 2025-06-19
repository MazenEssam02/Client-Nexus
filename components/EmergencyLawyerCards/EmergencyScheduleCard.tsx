import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { font } from "../../constants/Font";
import { MainButton } from "../Buttons/MainButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function EmergencyScheduleCard({ EmergencyData, navigation }) {
  const onPressHandler = () => {
    navigation.navigate("EmergencyLawyer", {
      screen: "EmergencyDetails",
      params: {
        ...EmergencyData,
        id: EmergencyData.serviceProviderId,
        serviceId: EmergencyData.id,
      },
    });
  };

  function handleEmergencyDetails() {
    switch (EmergencyData.status) {
      case "D":
        return "انتهت";

      case "C":
        return "الغيت";

      case "I":
        return "قيد التنفيذ";

      case "P":
        return "قيد الانتظار";
    }
  }
  const EmergencuStatus = handleEmergencyDetails();
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        {/* <View style={styles.imageContainer}>
          <Image source={require("../../assets/LawyerPic/image.png")} />
          </View> */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>السعر {EmergencyData.price}ج</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {/* {lawyer.FirstName + " " + lawyer.LastName} */}
            {EmergencyData.title}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.description} numberOfLines={2}>
            {/* {lawyer.FirstName + " " + lawyer.LastName} */}
            {EmergencyData.description}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>الحالة: {EmergencuStatus}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <MainButton
          title={EmergencyData.status !== "P" ? "عرض التفاصيل" : "الغاء الطلب"}
          onPress={onPressHandler}
          disabled={EmergencyData.status === "C"}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    backgroundColor: "white",
    padding: 8,
    margin: 10,
    marginTop: 20,
  },
  pressed: {
    opacity: 0.6,
  },
  cardHeader: {
    flex: 1,
    width: "100%",
    // height: 150,
    // flexDirection: "row-reverse",
    // alignItems: "flex-end",
    // padding: 20,
  },

  imageContainer: {
    flex: 1,
  },
  priceContainer: {
    // flex: 1,
  },
  titleContainer: {
    flex: 1,
    // alignItems: "flex-end",
  },
  infoContainer: {
    flex: 2,
    // alignItems: "flex-end",
  },
  title: {
    color: Colors.SecondaryColor,
    ...font.title,
    textAlign: "right",
  },
  description: {
    color: Colors.SecondaryColor,
    ...font.body,
    textAlign: "right",
  },
  priceText: {
    color: Colors.SecondaryColor,
    ...font.headline,
    textAlign: "center",
    fontSize: 20,
  },
  statusContainer: {
    width: "100%",
    marginTop: 10,
  },
  statusText: {
    color: Colors.SecondaryColor,
    ...font.headline,
    textAlign: "right",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    height: 36,
    width: "35%",
  },
});
