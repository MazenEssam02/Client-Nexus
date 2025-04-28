import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import FavouriteLawyerCard from "../components/LawyerCard/FavouriteLawyerCard";
import ScheduleLawyerCard from "../components/ScheduleCard/ScheduleLawyerCard";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
export default function ScheduleScreen() {
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      date: "11/1/2025",
      rate: "3",
      day: "الأربعاء",
      name: "المحامي جورج جيهام",
      speciality: "شرعي وأحوال",
      time: "15:00",
      type: "استشارة مكتبية",
      image: "../assets/LawyerPic/image.png", // Replace with actual image URL
    },
    {
      id: "2",
      date: "12/1/2025",
      rate: "5",
      day: "الخميس",
      name: "المحامي عبدالكريم غفار",
      speciality: "شرعي وأحوال",
      time: "15:00",
      type: "استشارة مكتبية",
      image: "../assets/LawyerPic/image.png", // Replace with actual image URL
    },
    {
      id: "3",
      date: "13/1/2025",
      rate: "4",
      day: "الجمعة",
      name: "المحامي عبدالكريم غفار",
      speciality: "شرعي وأحوال",
      time: "15:00",
      type: "استشارة مكتبية",
      image: "../assets/LawyerPic/image.png", // Replace with actual image URL
    },
  ]);

  // Uncomment the next line to test the empty screen
  // setTransactions([]);

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            لا توجد معاملات في حسابك للفترة القادمة{"\n"}يمكنك البدء بحجز جلسة
            من صفحة البحث
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={ScheduleLawyerCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
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
