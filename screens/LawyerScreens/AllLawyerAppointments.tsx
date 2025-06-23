import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback } from "react";
import ScreensWrapper from "../ScreensWrapper/ScreensWrapper";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Client, ServiceProvider, Slots } from "../../API/https";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import IsError from "../../components/IsError/IsError";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import timeZoneConverter from "../../utils/timeZoneConverter";
import NoResponse from "../../components/NoResponse/NoResponse";

export const weekday = [
  "الاحد",
  "الاثنين",
  "الثلاثاء",
  "الاربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

export const appointmentStatus = {
  80: "تحت المراجعة",
  73: "قيد التنفيذ",
  68: "تم",
  67: "ملغي",
};

export const appointmentType = {
  80: "هاتف",
  73: "في المكتب",
  79: "عبر الإنترنت",
};

export default function AllLawyerAppointments() {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const appointmentsRes = await ServiceProvider.getAppointments();
      const appointments = appointmentsRes.data;
      const fullItems = await Promise.all(
        appointments.map(async (item) => {
          const client = await Client.get(item.clientId);
          const slot = await Slots.getById(item.slotId);
          return {
            ...slot.data,
            ...item,
            client: client.data.data,
          };
        })
      );
      return fullItems;
    },
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Invalidate the "appointments" query so React Query refetches it
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
    } catch (err) {
      Alert.alert("Error", "Failed to refresh appointments. Please try again.");
    } finally {
      setRefreshing(false);
    }
  }, [queryClient]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <IsError error={error} />;
  }
  if (!data || data.length === 0) {
    return <NoResponse text="لا توجد مواعيد حاليا" />;
  }
  console.log(data[0].status);
  return (
    <ScreensWrapper>
      <FlatList
        data={data.sort(
          (b: any, a: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )}
        keyExtractor={(item: any) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View>
            <PreviewCard
              name={item.client.firstName + " " + item.client.lastName}
              img={item.client.mainImage}
              title={
                timeZoneConverter(item.date) +
                "  " +
                new Date(item.date).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) +
                "\n" +
                weekday[new Date(item.date).getDay()]
              }
              desc={
                "الحالة: " +
                (appointmentStatus[item.status] ??
                  (new Date(item.date + "Z").getTime() > Date.now()
                    ? appointmentStatus[73]
                    : appointmentStatus[68])) +
                "\n" +
                "النوع: " +
                (appointmentType[item.slotType] ?? "مجهول")
              }
              showImage
            />
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      />
    </ScreensWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginInline: 30,
  },
  pressed: {
    opacity: 0.3,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 40,
    minHeight: "100%",
  },
  DataContainer: {
    marginVertical: 7,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: font.subtitle.fontFamily,
    fontSize: font.subtitle.fontSize,
    borderBottomWidth: 1,
    borderBottomColor: Colors.SecondaryColor,
    color: Colors.SecondaryColor,
  },
  info: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.mainColor,
  },
});
