import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import { Rate1 } from "../Icons/Rate1";
import { Rate2 } from "../Icons/Rate2";
import { Rate3 } from "../Icons/Rate3";
import { Rate4 } from "../Icons/Rate4";
import { Rate5 } from "../Icons/Rate5";

const FavouriteLawyerCard = ({
  name,
  rate,
  speciality,
  address,
  onPress = null,
  id = null,
  mainImage = null,
  isDisabled = false,
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
  // function deleteHandler(id) {
  //   removeFromFavorites(id);
  //   console.log("Deleted the id with", id);
  // }
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          !isDisabled && pressed && styles.pressed,
        ]}
        onPress={() => !isDisabled && onPress(id)}
      >
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: mainImage }} style={styles.image} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.specialitiyText}>
                محامي {!!speciality ? speciality : "غير معلوم"}
              </Text>
              {address && (
                <Text style={styles.vezitaText}>
                  العنوان: {!!address ? address : "غير معلوم"}
                </Text>
              )}
            </View>
            {/* <View style={styles.vezitaContainer}>
              <RateHandler style={styles.rate} />
            </View> */}
          </View>
          {/* {editable && (
            <View style={styles.overlay}>
              <Pressable
                onPress={() => deleteHandler(id)}
                style={styles.closeButton}
              >
                <Text style={styles.button}>ازالة</Text>
              </Pressable>
            </View>
          )} */}
        </View>
      </Pressable>
    </>
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
    maxHeight: 100,
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
  image: {
    flex: 1,
    minWidth: 50,
    borderRadius: 15,
    alignSelf: "center",
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
    marginLeft: 10,
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: Colors.invalidColor600,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  button: {
    fontFamily: font.Button.fontFamily,
    fontSize: font.Button.fontSize,
    color: "white",
  },
});
export default FavouriteLawyerCard;
