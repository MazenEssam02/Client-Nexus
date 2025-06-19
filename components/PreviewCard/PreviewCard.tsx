import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { font } from "../../constants/Font";
import { Colors } from "../../constants/Color";
import { useNavigation } from "@react-navigation/native";
import getAge from "../../helpers/getAgeFromDate";
import { MainButton } from "../Buttons/MainButton";

export const PreviewCard = ({
  title,
  name,
  img = "",
  showImage = true,
  desc = "",
  onPress = null,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View
          style={[styles.userInfoContainer, showImage && { marginRight: 16 }]}
        >
          <Text style={styles.nameText}>
            {name || "اسم المستخدم غير متوفر"}
          </Text>
          <Text style={styles.titleText}>{title || "عنوان غير متوفر"}</Text>
        </View>
        {showImage && (
          <Image
            source={img ? { uri: img } : require("../../assets/user.jpg")}
            style={styles.profileImage}
          />
        )}
      </View>

      {!!desc && (
        <Text style={styles.descriptionText}>
          {desc || "لا يوجد وصف متاح لهذا العنصر"}
        </Text>
      )}

      {!!onPress && (
        <View style={styles.button}>
          <MainButton title="قراءة المزيد" onPress={onPress || (() => {})} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    padding: 20,
    margin: 10,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userInfoContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  nameText: {
    ...font.headline,
    fontWeight: "bold",
    color: Colors.SecondaryColor,
    textAlign: "right",
  },
  titleText: {
    ...font.subtitle,
    fontSize: 16,
    color: Colors.SecondaryColor,
    textAlign: "right",
    marginTop: 2,
  },
  descriptionText: {
    ...font.body,
    fontSize: 15,
    color: Colors.SecondaryColor,
    lineHeight: 22,
    textAlign: "right",
    marginBottom: 20,
  },
  button: {
    height: 40,
    width: 120,
  },
});
