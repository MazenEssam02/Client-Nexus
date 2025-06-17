import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { font } from "../../constants/Font";
import { MainButton } from "../Buttons/MainButton";
import LawyerSummarylist from "../LawyerSummarylist/LawyerSummarylist";
import { EmeregencyCases } from "../../API/https";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import useEmergencyStore from "../../store/EmergencyStore";
export default function EmergencyCard({ lawyer, emergencyCaseId, navigation }) {
  const { mutate: acceptLawyer } = useMutation({
    mutationFn: () =>
      EmeregencyCases.acceptEmergency(
        emergencyCaseId,
        lawyer.ServiceProviderId
      ),
    onSuccess: (data) => {
      console.log("lawyer accepted", data.data.phoneNumber);
      useEmergencyStore.getState().updateLawyer({
        phone: data.data.phoneNumber,
        id: lawyer.ServiceProviderId,
        price: lawyer.Price,
      });
      navigation.navigate("EmergencyDetails");
      // console.log("lawyer accepted");
    },
    onError: (error) => {
      console.log("Error " + error);
    },
  });
  const onPressHandler = () => {
    acceptLawyer();
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={
              lawyer.ImageUrl
                ? { uri: lawyer.ImageUrl }
                : require("../../assets/user.jpg")
            }
          />
        </View>
        <View style={styles.cardHeader}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{lawyer.Price}ج</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>
              {lawyer.FirstName + " " + lawyer.LastName}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.SummaryContainer}>
        <LawyerSummarylist
          rate={lawyer.Rating}
          yearsOfExperience={lawyer.YearsOfExperience}
        />
      </View>

      <View style={styles.buttonContainer}>
        <MainButton title="قبول" onPress={onPressHandler} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 280,
    backgroundColor: "white",
    padding: 8,
    margin: 10,
    marginTop: 20,
  },
  card: {
    flex: 1,
    width: "100%",
    maxHeight: 100,
    flexDirection: "row-reverse",
    alignItems: "center",
    overflow: "hidden",
    padding: 8,
  },
  cardHeader: {
    flex: 4,
    // width: "100%",
    // height: 50,
    // flexDirection: "row-reverse",
    alignItems: "center",
    // padding: 20,
  },

  imageContainer: {
    flex: 1,
  },
  priceContainer: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    borderRadius: 15,
    alignSelf: "center",
    width: 80,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.SecondaryColor,
    ...font.headline,
  },
  priceText: {
    color: Colors.SecondaryColor,
    ...font.headline,
    fontSize: 25,
  },
  SummaryContainer: {
    width: "100%",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 10,
    alignSelf: "center",
    height: 36,
    width: "30%",
  },
});
