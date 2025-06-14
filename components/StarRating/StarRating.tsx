import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Color";

const StarRating = ({
  rating,
  setRating = null,
  starSize = 15,
  editable = true,
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          disabled={!editable}
          onPress={() => setRating(star)}
        >
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={starSize}
            // color={star <= rating ? "#FFD700" : "#C0C0C0"}
            color={star <= rating ? Colors.mainColor : Colors.gray500}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default StarRating;
