import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { font } from "../../constants/Font";
import { Rate1 } from "../Icons/Rate1";
import { Rate2 } from "../Icons/Rate2";
import { Rate3 } from "../Icons/Rate3";
import { Rate4 } from "../Icons/Rate4";
import { Rate5 } from "../Icons/Rate5";

const LawyerCard = ({
  name = "",
  rate = "",
  speciality = "",
  gender = 77,
  vezita = "",
  address = "",
  onPress = null,
  imageURL = null,
  style = null,
  isLawyerDetailsCard = false,
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
      default:
        return;
    }
  }
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && !isLawyerDetailsCard && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={!isLawyerDetailsCard ? styles.card : style}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={
              imageURL
                ? { uri: imageURL }
                : require("../../assets/LawyerPic/image.png")
            }
          />
        </View>
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {gender === 77 ? "المحامى" : "المحامية"} {name}
          </Text>
          <View style={styles.ratingContainer}>
            <RateHandler style={styles.rate} />
            {!isLawyerDetailsCard ? (
              <Text style={styles.specialitiyText}>محامي {speciality}</Text>
            ) : (
              ""
            )}
          </View>
          <View style={styles.vezitaContainer}>
            {!isLawyerDetailsCard ? (
              <Text style={styles.vezitaText}>سعر الاستشارة: {vezita}ج</Text>
            ) : (
              <Text style={styles.specialitiyText}>
                {speciality && `محامي ${speciality}`}
              </Text>
            )}
            {!!address ? (
              <Text style={styles.vezitaText}>العنوان: {address}</Text>
            ) : (
              ""
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressed: {
    opacity: 0.6,
  },
  card: {
    flex: 1,
    width: "100%",
    maxHeight: 90,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    alignItems: "center",
    overflow: "hidden",
    padding: 8,
    marginVertical: 10,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 30,
  },
  imageStyle: {
    flex: 1,
    borderRadius: "50%",
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
    marginHorizontal: 10,
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
    marginInline: 8,
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
export default LawyerCard;
