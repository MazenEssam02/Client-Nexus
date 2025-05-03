import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { font } from "../../constants/Font";
import { Rate1 } from "../Icons/Rate1";
import { Rate2 } from "../Icons/Rate2";
import { Rate3 } from "../Icons/Rate3";
import { Rate4 } from "../Icons/Rate4";
import { Rate5 } from "../Icons/Rate5";
const LawyerDetailsCard = ({
  name = "المحامي عبدالكريم غفار",
  rate = "3",
  speciality = "جنائي",
  vezita = null,
  address = "وسط البلد",
  onPress = null,
  imageURL = null,
}) => {
  function RateHandler({ style }) {
    switch (rate) {
      case "1":
        return <Rate1 style={style} />;
      case "2":
        return <Rate2 style={style} />;
      case "3":
        return <Rate3 style={style} />;
      case "4":
        return <Rate4 style={style} />;
      case "5":
        return <Rate5 style={style} />;
    }
  }
  console.log(imageURL);
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageContainer}
          source={
            imageURL
              ? { uri: imageURL }
              : require("../../assets/LawyerPic/image.png")
          }
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.ratingContainer}>
          <RateHandler style={styles.rate} />
          <Text style={styles.specialitiyText}>محامي {speciality}</Text>
        </View>
        <View style={styles.vezitaContainer}>
          <Text style={styles.vezitaText}>العنوان: {address}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    flex: 1,
    width: "100%",
    maxHeight: 90,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 8,
  },
  imageContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.SecondaryColor,
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
  },
  ratingContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginInline: 3,
  },
  specialitiyText: {
    fontSize: font.subtitle.fontSize,
    fontFamily: font.subtitle.fontFamily,
    color: Colors.SecondaryColor,
  },
  vezitaContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  vezitaText: {
    fontSize: font.subtitle.fontSize,
    fontFamily: font.subtitle.fontFamily,
    color: Colors.SecondaryColor,
    marginInline: 8,
  },
  rate: {
    alignSelf: "center",
    marginVertical: 0,
    justifyContent: "flex-end",
    marginLeft: 5,
  },
});
export default LawyerDetailsCard;
