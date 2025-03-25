import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Edit } from "../Icons/Edit";
import { Colors } from "../../constants/Color";
import { useNavigation, useRoute } from "@react-navigation/native";
import Add from "../Icons/Add";
const FixedButton = ({ pressedHandle = null, editable = null }) => {
  const navigation = useNavigation();
  const route = useRoute();
  function PageHandler() {
    if (route.name == "Favourite") {
      return <Edit color={editable ? "black" : "white"} size={24} />;
    } else {
      return <Add />;
    }
  }
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.fixedButton, pressed && styles.pressed]}
        onPress={pressedHandle}
      >
        <PageHandler />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.6,
  },
  fixedButton: {
    position: "absolute",
    bottom: 30, // Adjust for desired position
    left: 20, // Adjust for desired position
    backgroundColor: Colors.mainColor,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FixedButton;
