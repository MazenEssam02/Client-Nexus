import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useAuthStore } from "../../store/auth";
import { apiClient, Client, ServiceProvider, Slots } from "../../API/https";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import IsError from "../../components/IsError/IsError";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { MainButton } from "../../components/Buttons/MainButton";
import AddSlotModal from "../../components/AddSlotModal/AddSlotModal";

LocaleConfig.locales["ar"] = {
  monthNames: [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  monthNamesShort: [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  dayNames: [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ],
  dayNamesShort: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  today: "اليوم",
};
LocaleConfig.defaultLocale = "ar";

export default function LawyerScheduleScreen() {
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const queryClient = useQueryClient();
  // get first day of the month
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().split("T")[0]
  );
  const firstDayOfMonth = new Date(selectedMonth);
  firstDayOfMonth.setDate(1);
  const lastDayOfMonth = new Date(selectedMonth);
  lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
  lastDayOfMonth.setDate(0); // Set to the last day of the month
  const results = useQueries({
    queries: [
      {
        queryKey: ["slots", firstDayOfMonth],
        queryFn: () =>
          Slots.get({
            serviceProviderId: user.id,
            startDate: firstDayOfMonth.toISOString(),
            endDate: lastDayOfMonth.toISOString(),
          }),
        refetchInterval: 10000, // Refetch every 10 seconds
      },
      {
        queryKey: ["appointments", firstDayOfMonth],
        queryFn: async () => {
          const appointmentsRes = await ServiceProvider.getAppointments();
          const appointments = appointmentsRes.data.filter(
            (item) => item.slotDate
          );
          const fullItems = await Promise.all(
            appointments.map(async (item) => {
              const client = await Client.get(item.clientId);
              return {
                ...item,
                client: client.data.data,
              };
            })
          );
          return fullItems;
        },
      },
    ],
  });
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const [slotsData, appointmentsData] = results;
  console.log(JSON.stringify(appointmentsData.data, null, 2));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const slots = slotsData.data;
  const todaySlots = slots?.filter((slot) => {
    const slotDate = new Date(slot.date);
    return (
      slotDate.getFullYear() === new Date(selectedDate).getFullYear() &&
      slotDate.getMonth() === new Date(selectedDate).getMonth() &&
      slotDate.getDate() === new Date(selectedDate).getDate()
    );
  });
  const daysHaveSlots = slots?.reduce((acc, slot) => {
    const slotDate = new Date(slot.date).toISOString().split("T")[0];
    acc[slotDate] = {
      selected: true,
      selectedColor: Colors.SecondaryColorLight,
      selectedTextColor: "white",
    };
    return acc;
  }, {});
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  if (isError) {
    return <IsError error={results.find((result) => result.isError)?.error} />;
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Calendar
        onDayPress={(day) => {
          console.log("Selected day:", day.dateString);
          setSelectedSlot(null); // Reset selected slot when date changes
          setSelectedDate(day.dateString);
        }}
        style={{
          borderWidth: 1,
          borderColor: Colors.mainColor,
        }}
        minDate={new Date().toISOString().split("T")[0]}
        theme={{
          arrowColor: Colors.mainColor,
          todayTextColor: Colors.mainColor,
        }}
        markedDates={{
          ...daysHaveSlots,
          [selectedDate]: {
            selected: true,
            selectedColor: Colors.mainColor,
            selectedTextColor: "white",
          },
        }}
        onMonthChange={(month) => {
          const date = new Date(month.dateString);
          date.setDate(1); // Set to the first day of the month
          setSelectedSlot(null); // Reset selected slot when month changes
          setSelectedMonth(date.toISOString().split("T")[0]);
        }}
      />
      <View style={styles.list}>
        <Text
          style={{
            ...font.headline,
            textAlign: "right",
            marginVertical: 5,
          }}
        >
          المواعيد المتاحة
        </Text>
        {isLoading ? (
          <LoadingSpinner />
        ) : todaySlots.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "flex-end",
            }}
          >
            {/* Display slots for the selected date */}
            {todaySlots.map((slot) => (
              <Pressable
                key={slot.id}
                style={({ pressed }) => [
                  {
                    backgroundColor:
                      selectedSlot?.id === slot.id
                        ? Colors.mainColor
                        : Colors.SecondaryColorLight,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 5,
                    width: 100,
                    alignItems: "flex-end",
                  },
                ]}
                onPress={() => {
                  console.log("Slot selected:", slot);
                  setSelectedSlot(slot);
                }}
              >
                <Text style={{ color: "white" }}>
                  {new Date(slot.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Text style={{ color: "white" }}>
                  {slot.slotType === 80
                    ? "هاتف"
                    : slot.slotType === 73
                    ? "في المكتب"
                    : "عبر الإنترنت"}
                </Text>
                <Text style={{ color: "white" }}>
                  {slot.status === 65 ? "متاح" : "غير متاح"}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              لا توجد مواعيد متاحة لهذا اليوم
            </Text>
          </View>
        )}
        <View
          style={{ flexDirection: "row", gap: 10, height: 40, marginTop: 16 }}
        >
          <View style={{ flex: 1 }}>
            <MainButton
              title="إضافة موعد"
              onPress={() => setShowAddSlotModal(true)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <MainButton
              title="إزالة موعد"
              disabled={!selectedSlot || isLoadingDelete}
              onPress={async () => {
                setIsLoadingDelete(true);
                try {
                  await Slots.delete(selectedSlot.id);
                  setSelectedSlot(null);
                  await queryClient.invalidateQueries({
                    queryKey: ["slots", firstDayOfMonth],
                  });
                } catch (apiError: any) {
                  console.error("Error deleting slot:", apiError);
                  Alert.alert(
                    "خطأ",
                    apiError.message ||
                      "فشل إنشاء الفترة الزمنية. حاول مرة أخرى."
                  );
                } finally {
                  setIsLoadingDelete(false);
                }
              }}
            />
          </View>
        </View>
        <AddSlotModal
          visible={showAddSlotModal}
          date={new Date(selectedDate)}
          onClose={() => setShowAddSlotModal(false)}
          onSubmit={async (newSlot) => {
            console.log("New Slot Submitted:", newSlot);
          }}
        />
      </View>
    </ScrollView>
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
    backgroundColor: "white",
    marginVertical: 10,
  },
});
