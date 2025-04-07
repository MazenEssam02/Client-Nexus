import { StyleSheet, View, Text, Pressable } from "react-native";
import { Colors } from "../../constants/Color";

import { font } from "../../constants/Font";

import { Arrow } from "../Icons/Arrow";
export default function AboutLawyer({ lawyer }) {
  return (
    <View style={styles.aboutContainer}>
      <View style={styles.aboutUpperContainer}>
        <Text style={styles.title}>عن المحامي</Text>
        <Pressable
          style={({ pressed }) => [
            styles.arrowClose,
            pressed && styles.arrowOpen,
          ]}
        >
          <Arrow fillColor={Colors.mainColor} />
        </Pressable>
      </View>
      <View style={{ padding: 10 }}>
        {lawyer.about.split("\n").map((line, index) => (
          <View key={index} style={{ flexDirection: "row-reverse" }}>
            <Text style={styles.aboutBullet}>• </Text>
            <Text style={styles.aboutText}>{line}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  aboutContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 20,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    color: Colors.SecondaryColor,
    ...font.title,
    textAlign: "right",
  },
  aboutText: {
    color: Colors.SecondaryColor,
    ...font.body,
    textAlign: "right",
    paddingRight: 10,
  },
  aboutBullet: {
    color: Colors.SecondaryColor,
    ...font.body,
    textAlign: "right",
  },

  aboutUpperContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
  },
  arrowClose: {
    transform: "rotateZ(90deg)",
  },
  arrowOpen: {
    transform: "rotateZ(270deg)",
  },
});
