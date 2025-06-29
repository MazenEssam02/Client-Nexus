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
import {
  apiClient,
  Appointments,
  Client,
  ServiceProvider,
  Slots,
} from "../../API/https";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import IsError from "../../components/IsError/IsError";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { MainButton } from "../../components/Buttons/MainButton";
import AddSlotModal from "../../components/AddSlotModal/AddSlotModal";
import timeZoneConverter, {
  convertDurationToReadableFormat,
} from "../../utils/timeZoneConverter";
import {
  appointmentStatus,
  appointmentType,
  weekday,
} from "./AllLawyerAppointments";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import IsLoading from "../../components/IsLoading/IsLoading";
import ArCalendar, {
  easternArabicNumeralFormatter,
} from "../../components/ArCalendar/ArCalendar";

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

export default function LawyerScheduleScreen({ navigation }) {
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
        refetchInterval: 10000, // Refetch every 10 seconds
      },
    ],
  });
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const [slotsData, appointmentsData] = results;

  const [selectedSlot, setSelectedSlot] = useState(null);
  const slots = slotsData.data;
  const allItems = slots &&
    appointmentsData.data && [...slots, ...appointmentsData.data];

  console.log(JSON.stringify(allItems, null, 2));

  const todaySlots = allItems?.filter((slot) => {
    const slotDate = new Date(slot.date);
    return (
      slotDate.getFullYear() === new Date(selectedDate).getFullYear() &&
      slotDate.getMonth() === new Date(selectedDate).getMonth() &&
      slotDate.getDate() === new Date(selectedDate).getDate()
    );
  });
  const daysHaveSlots = allItems?.reduce((acc, slot) => {
    const slotDate = slot.date.split("T")[0];
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
      <ArCalendar
        onDayPress={(day) => {
          console.log("Selected day:", day.dateString);
          setSelectedSlot(null); // Reset selected slot when date changes
          setSelectedDate(day.dateString);
        }}
        style={{
          borderWidth: 1,
          borderColor: Colors.mainColor,
        }}
        theme={{
          arrowColor: Colors.mainColor,
          todayTextColor: Colors.mainColor,
        }}
        firstDay={6}
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
          <IsLoading />
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
                    width: 120,
                    alignItems: "flex-end",
                  },
                ]}
                onPress={() => {
                  console.log("Slot selected:", slot);
                  setSelectedSlot(slot);
                }}
              >
                <Text style={{ color: "white" }}>
                  {timeZoneConverter(slot.date)}
                </Text>
                {/*slotDuration, format: 00:30:00 */}
                {/* convert to Arabic numerals */}
                <Text style={{ color: "white" }}>
                  المدة: {convertDurationToReadableFormat(slot.slotDuration)}
                </Text>
                <Text style={{ color: "white" }}>
                  {slot.slotType === 80
                    ? "هاتف"
                    : slot.slotType === 73
                    ? "في المكتب"
                    : "عبر الإنترنت"}
                </Text>
                <Text style={{ color: "white" }}>
                  {!("client" in slot) ? "متاح" : "محجوز"}
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
              disabled={new Date(selectedDate) < new Date()}
              title="إضافة موعد"
              onPress={() => setShowAddSlotModal(true)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <MainButton
              title={
                selectedSlot && "client" in selectedSlot
                  ? "الغاء الحجز"
                  : "حذف الموعد"
              }
              loading={isLoadingDelete}
              disabled={
                !selectedSlot ||
                isLoadingDelete ||
                new Date(selectedDate + "Z") < new Date() ||
                (selectedSlot &&
                  "client" in selectedSlot &&
                  [68, 67].includes(selectedSlot.status))
              }
              onPress={async () => {
                setIsLoadingDelete(true);
                try {
                  if (selectedSlot && "client" in selectedSlot) {
                    await Appointments.finishAppointment({
                      id: selectedSlot.id,
                      status: 67, // Cancelled status
                      reason: "تم إلغاء الموعد من قبل المحامي",
                    });
                    await Slots.delete(selectedSlot.slotId);
                  } else {
                    await Slots.delete(selectedSlot.id);
                  }
                  setSelectedSlot(null);
                  await queryClient.invalidateQueries({
                    queryKey: ["slots", firstDayOfMonth],
                  });
                  await queryClient.invalidateQueries({
                    queryKey: ["appointments"],
                  });
                } catch (apiError: any) {
                  console.error(
                    "Error deleting slot:",
                    JSON.stringify(apiError, null, 2)
                  );
                  // print error message
                  console.error("Error message:", apiError.message);
                  Alert.alert(
                    "خطأ",
                    "فشل إلغاء الفترة الزمنية. حاول مرة أخرى."
                  );
                } finally {
                  setIsLoadingDelete(false);
                }
              }}
            />
          </View>
        </View>
        {selectedSlot && "client" in selectedSlot && (
          <View>
            <PreviewCard
              name={
                selectedSlot.client.firstName +
                " " +
                selectedSlot.client.lastName
              }
              img={selectedSlot.client.mainImage}
              title={
                timeZoneConverter(selectedSlot.date) +
                "  " +
                new Date(selectedSlot.date).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) +
                "\n" +
                weekday[new Date(selectedSlot.date).getDay()]
              }
              desc={
                "الحالة: " +
                (appointmentStatus[selectedSlot.status] ??
                  (new Date(selectedSlot.date) > new Date()
                    ? appointmentStatus[73]
                    : appointmentStatus[68])) +
                "\n" +
                "النوع: " +
                (appointmentType[selectedSlot.slotType] ?? "مجهول")
              }
              showImage
            />
            {"client" in selectedSlot &&
              [73, 80].includes(selectedSlot.status) && (
                <View style={{ height: 35, marginTop: -20 }}>
                  <MainButton
                    title="إنهاء الموعد"
                    disabled={
                      new Date(selectedSlot.date + "Z").getTime() > Date.now()
                    }
                    onPress={async () => {
                      try {
                        await Appointments.finishAppointment({
                          id: selectedSlot.id,
                          status: 68, // Finished status
                          reason: "تم إنهاء الموعد من قبل المحامي",
                        });
                        setSelectedSlot(null);
                        await queryClient.invalidateQueries({
                          queryKey: ["appointments"],
                        });
                      } catch (error) {
                        console.error(
                          "Error finishing appointment:",
                          JSON.stringify(error, null, 2)
                        );
                        Alert.alert("خطأ", "فشل إنهاء الموعد. حاول مرة أخرى.");
                      }
                    }}
                  />
                </View>
              )}
          </View>
        )}
        <AddSlotModal
          visible={showAddSlotModal}
          date={new Date(selectedDate)}
          onClose={() => setShowAddSlotModal(false)}
          onSubmit={async (newSlot) => {
            console.log("New Slot Submitted:", newSlot);
          }}
        />
      </View>
      {/* add a generate schedule button */}
      <View
        style={{
          height: 50,
          backgroundColor: "white",
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        <MainButton
          title="توليد المواعيد"
          onPress={() => {
            setSelectedSlot(null);
            navigation.navigate("LawyerGenerateSlots");
          }}
        />
      </View>
      <View
        style={{
          height: 50,
          backgroundColor: "white",
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        <MainButton
          title="جميع المواعيد"
          onPress={() => {
            setSelectedSlot(null);
            navigation.navigate("LawyerBookedAppointments", {
              appointments: appointmentsData.data,
            });
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
