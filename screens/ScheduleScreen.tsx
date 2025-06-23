import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import ScheduleLawyerCard from "../components/ScheduleCard/ScheduleLawyerCard";
import { Colors } from "../constants/Color";
import { font } from "../constants/Font";
import { useQuery } from "@tanstack/react-query";
import { Client } from "../API/https";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import IsError from "../components/IsError/IsError";
import timeZoneConverter from "../utils/timeZoneConverter";
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
      id: 0,
      serviceProviderId: "",
      date: "",
      rate: "",
      day: "",
      name: "",
      speciality: "",
      time: "",
      type: "",
      image: "",
      isEnded: false,
      slotType: "",
    },
  ]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [refreshing, setRefreshing] = useState(false);
  const {
    data: Appointments,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["Appointments"],
    queryFn: Client.getAppointments,
  });
  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //   }, [refetch])
  // );
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (Appointments?.data) {
      setTransactions(
        Appointments.data.map((Appointment) => ({
          id: Appointment.id,
          serviceProviderId: Appointment.serviceProviderId,
          date: new Date(Appointment.slotDate).toLocaleDateString(),
          rate: Appointment.serviceProviderRate.toString(),
          day: weekday[new Date(Appointment.slotDate).getDay()],
          name: `${Appointment.serviceProviderFirstName} ${Appointment.serviceProviderLastName}`,
          speciality: Appointment.serviceProviderMainSpecialization,
          time: timeZoneConverter(Appointment.slotDate),
          type:
            Appointment.slotType === 73
              ? "مقابلة مكتبية"
              : Appointment.slotType === 79
              ? "مقابلة اونلاين"
              : "مقابلة هاتفية",
          mainImage: Appointment.serviceProviderMainImage,
          status: Appointment.status,
          isEnded:
            new Date(Appointment.slotDate) < today || Appointment.status === 68,
          isCompletedForFeedback: Appointment.completionTime
            ? Date.now() -
                new Date(Appointment.completionTime + "Z").getTime() <
              2 * 60 * 60 * 1000
            : false,
        }))
      );
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
          renderItem={({ item }) => <ScheduleLawyerCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.mainColor]} // Android
              tintColor={Colors.mainColor}
            />
          }
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
