import { StyleSheet, View, Text, Pressable } from "react-native";
import { Colors } from "../../constants/Color";

import { font } from "../../constants/Font";
import { Arrow } from "../Icons/Arrow";
import { useState } from "react";
export default function AboutLawyer({ lawyer }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <View style={styles.aboutContainer}>
      <View style={styles.aboutUpperContainer}>
        <Text style={styles.title}>عن المحامي</Text>
        <Pressable onPress={toggleExpand} style={styles.arrowContainer}>
          <Arrow
            fillColor={Colors.mainColor}
            rotation={isExpanded ? 90 : 270}
          />
        </Pressable>
      </View>
      {isExpanded ? (
        <View style={styles.list}>
          {lawyer.about.split("\n").map((line, index) => (
            <View key={index} style={{ flexDirection: "row-reverse" }}>
              <Text style={styles.aboutBullet}>• </Text>
              <Text style={styles.aboutText}>{line}</Text>
            </View>
          ))}
        </View>
      ) : (
        ""
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  aboutContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 15,
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
    paddingHorizontal: 10,
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
  arrowContainer: {
    padding: 5,
    marginHorizontal: 10,
  },
  list: {
    width: "100%",
    padding: 10,
  },
});
