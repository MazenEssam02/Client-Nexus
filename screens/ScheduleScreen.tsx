import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import ScheduleLawyerCard from "../components/ScheduleCard/ScheduleLawyerCard";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { useQuery } from "@tanstack/react-query";
import { Client, ServiceProvider } from "../API/https";
export default function ScheduleScreen() {
  const [lawyerData, setLawyerData] = useState([]);
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
  const fetchLawyer = async (lawyerId) => {
    try {
      const response = await ServiceProvider.getById(lawyerId);
      if (response && response.data) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Error While Fetching Lawyer with ID:" + lawyerId, err);
      throw err;
    }
  };
  useEffect(() => {
    const processAppointments = async () => {
      if (Appointments?.data) {
        const appointmentList = [];
        const lawyerIds = new Set();
        Appointments.data.data.forEach((appointment) => {
          lawyerIds.add(appointment.serviceProviderId);
        });
        try {
          const lawyerPromises = Array.from(lawyerIds).map(fetchLawyer);
          const lawyers = await Promise.all(lawyerPromises);
          const lawyerMap = {};
          lawyers.forEach((lawyer) => {
            if (lawyer) {
              lawyerMap[lawyer.id] = lawyer;
            }
          });
          setLawyerData(lawyerMap);
        } catch (err) {
          console.log(err);
        }
      }
    };
  }, []);
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
