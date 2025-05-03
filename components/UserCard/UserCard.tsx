import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { font } from "../../constants/Font";
import StarRating from "../StarRating/StarRating";

const UserCard = ({ feedbackItem }) => {
  //to be edited to get image and user name using their id
  const name = feedbackItem.clientId;
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/LawyerPic/image.png")} />
      </View>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>
        <View style={styles.ratingContainer}>
          <StarRating rating={feedbackItem.rate} editable={false} />
        </View>
        <Text style={styles.descriptionText}>{feedbackItem.feedback}</Text>
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
    // maxHeight: 90,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    alignItems: "center",
    overflow: "hidden",
    padding: 8,
    marginVertical: 10,
  },
  imageContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 4,
    justifyContent: "center",
    marginRight: 10,
  },
  title: {
    color: Colors.SecondaryColor,
    ...font.Caption,
    marginHorizontal: 10,
    textAlign: "right",
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
  descriptionContainer: {},
  descriptionText: {
    ...font.body,
    color: Colors.SecondaryColor,
    marginInline: 8,
    textAlign: "right",
  },
});
export default UserCard;
