import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import ScheduleLawyerCard from "../components/ScheduleCard/ScheduleLawyerCard";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { useQuery } from "@tanstack/react-query";
import { Client } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import IsError from "../components/IsError/IsError";
const weekday = [
  "الاحد",
  "الاثنين",
  "الثلاثاء",
  "الاربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
export default function ScheduleScreen() {
  const [transactions, setTransactions] = useState([
    {
      id: undefined,
      date: "",
      rate: "",
      day: "",
      name: "",
      speciality: "",
      time: "",
      type: "",
      image: "",
    },
  ]);
  const {
    data: Appointments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Appointments"],
    queryFn: Client.getAppointments,
  });
  useEffect(() => {
    if (Appointments?.data) {
      setTransactions(
        Appointments.data.map((Appointment) => ({
          id: Appointment.id,
          date: new Date(Appointment.slotDate).toLocaleDateString(),
          rate: Appointment.serviceProviderRate.toString(),
          day: weekday[new Date(Appointment.slotDate).getDay()],
          name: `${Appointment.serviceProviderFirstName}${Appointment.serviceProviderLastName}`,
          speciality: Appointment.serviceProviderMainSpecialization,
          time: new Date(Appointment.slotDate).getTime(),
          type: "مكتبي",
          image: Appointment.serviceProviderMainImage,
        }))
      );
      console.log(transactions[0].type);
    }
  }, [Appointments]);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <IsError error={error} />;
  }
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
