import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { font } from "../../constants/Font";
import Rating from "../../constants/Rating";
import { useNavigation } from "@react-navigation/native";
const LawyerCard = ({
  name = "المحامي عبدالكريم غفار",
  rate = "3",
  speciality = "جنائي",
  vezita = "150",
  address = "وسط البلد",
  onPress = null,
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => navigation.navigate("Home" as never)}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/LawyerPic/image.png")} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.ratingContainer}>
            <Image
              source={Rating[rate]}
              style={{
                marginInline: 5,
              }}
            />
            <Text style={styles.specialitiyText}>محامي {speciality}</Text>
          </View>
          <View style={styles.vezitaContainer}>
            <Text style={styles.vezitaText}>سعر الاستشارة: {vezita}</Text>
            <Text style={styles.vezitaText}>العنوان: {address}</Text>
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
    padding: 8,
    marginVertical: 10,
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
    justifyContent: "center",
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
});
export default LawyerCard;
