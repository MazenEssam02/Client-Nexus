import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useAuthStore } from "../../store/auth";
import { apiClient, Slots } from "../../API/https";

export default function LawyerScheduleScreen() {
  const { user } = useAuthStore();

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [pressed && { opacity: 0.5 }]}
        onPress={async () => {
          console.log("Fetching user data...");
          const { data: userData } = await Slots.getWeek({
            serviceProviderId: user.id,
            startDate: new Date().toISOString(),
            endDate: new Date(
              new Date().setDate(new Date().getDate() + 7)
            ).toISOString(),
            type: 80,
          });
          console.log("User Data:", userData);
        }}
      >
        <Text>تعديل</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: font.headline.fontSize,
    fontFamily: font.headline.fontFamily,
    color: Colors.SecondaryColor,
    lineHeight: 28,
  },
  list: {
    padding: 10,
  },
});
