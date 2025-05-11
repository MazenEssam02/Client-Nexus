import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { font } from "../../constants/Font";
import { MainButton } from "../Buttons/MainButton";
import LawyerSummarylist from "../LawyerSummarylist/LawyerSummarylist";
export default function EmergencyCard({ lawyer, onPress = null }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/LawyerPic/image.png")} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{lawyer.name}</Text>
        </View>
      </View>
      <View style={styles.SummaryContainer}>
        <LawyerSummarylist lawyer={lawyer} />
      </View>

      <View style={styles.buttonContainer}>
        <MainButton title="قبول" onPress={() => {}} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 260,
    backgroundColor: "white",
    padding: 8,
    margin: 10,
    marginTop: 20,
  },
  cardHeader: {
    flex: 1,
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 20,
  },

  imageContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.SecondaryColor,
    ...font.headline,
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
