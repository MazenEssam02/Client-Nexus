import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { font } from "../../constants/Font";

const LawyerCard = ({
  name = "المحامي عبدالكريم غفار",
  rate = "3",
  speciality = "جنائي",
  vezita = "150",
  address = "وسط البلد",
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/LawyerPic/image.png")} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <View>
          <Text>{rate}</Text>
          <Text>{speciality}</Text>
        </View>
        <View>
          <Text>سعر الاستشارة: {vezita}</Text>
          <Text>العنوان : {address}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    maxHeight: 120,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 8,
    marginVertical: 10,
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
    fontSize: font.headline.fontSize,
  },
});
export default LawyerCard;
