import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import CheckMark from "../components/Icons/CheckMark";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";

export default function SuccessScreen(navigation) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <CheckMark />
        <Text style={styles.title}>تم الحجز بنجاح</Text>
        <Text style={styles.subtitle}>
          شكراً لاستخدامك منصتنا، سيتم التواصل معك قريباً
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>العودة للرئيسية</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 25,
  },
  title: {
    ...font.title,
    color: Colors.SecondaryColor,
    marginBottom: 10,
  },
  subtitle: {
    ...font.subtitle,
    color: Colors.SecondaryColor,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
