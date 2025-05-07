// import React from "react";
// import { View, StyleSheet, Text } from "react-native";

// import { useNavigation, useRoute } from "@react-navigation/native";
// import { Colors } from "../constants/Color";
// import { Calendar } from "react-native-calendars";
// import { getArabicDayName } from "../helpers/getArabicDayString";
// export default function BookingScreen() {
//   const route = useRoute();
//   const typeNo = route.params;
//   console.log(typeNo);
//   const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
//   const arabicDay = getArabicDayName(today);
//   return (
//     <View style={styles.container}>
//       <Text>Today in Arabic: {arabicDay}</Text>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   webview: {
//     flex: 1,
//     // marginTop: 20,
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Colors } from "../constants/Color";

const BookingScreen = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const slots = [
    {
      id: 13,
      serviceProviderId: 25,
      date: "2025-05-08T11:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 14,
      serviceProviderId: 25,
      date: "2025-05-08T12:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 15,
      serviceProviderId: 25,
      date: "2025-05-08T13:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 16,
      serviceProviderId: 25,
      date: "2025-05-08T14:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 17,
      serviceProviderId: 25,
      date: "2025-05-08T15:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 18,
      serviceProviderId: 25,
      date: "2025-05-09T12:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 19,
      serviceProviderId: 25,
      date: "2025-05-09T13:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 20,
      serviceProviderId: 25,
      date: "2025-05-09T14:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 21,
      serviceProviderId: 25,
      date: "2025-05-09T15:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 22,
      serviceProviderId: 25,
      date: "2025-05-09T16:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 23,
      serviceProviderId: 25,
      date: "2025-05-10T16:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 24,
      serviceProviderId: 25,
      date: "2025-05-11T16:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 25,
      serviceProviderId: 25,
      date: "2025-05-12T16:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 26,
      serviceProviderId: 25,
      date: "2025-05-13T16:00:00",
      status: 65,
      slotType: 73,
    },
    {
      id: 27,
      serviceProviderId: 25,
      date: "2025-05-14T16:00:00",
      status: 65,
      slotType: 73,
    },
  ];
  // 1. Extract unique days from the slots
  const getUniqueDays = () => {
    const daysMap = {};
    slots.forEach((slot) => {
      const date = new Date(slot.date);
      const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD format
      if (!daysMap[dayKey]) {
        daysMap[dayKey] = {
          date: dayKey,
          dayName: date.toLocaleDateString("ar-SA", { weekday: "long" }),
          fullDate: date.toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
        };
      }
    });
    return Object.values(daysMap);
  };

  // 2. Filter slots by selected day
  const getTimeSlotsForDay = () => {
    if (!selectedDay) return [];
    return slots
      .filter((slot) => slot.date.startsWith(selectedDay.date))
      .map((slot) => {
        const time = new Date(slot.date).toLocaleTimeString("ar-SA", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return { ...slot, formattedTime: time };
      });
  };

  const days = getUniqueDays();
  const timeSlots = getTimeSlotsForDay();

  return (
    <View style={styles.container}>
      {/* Day Picker */}
      <Text style={styles.sectionTitle}>اختر اليوم:</Text>
      <View style={styles.daysContainer}>
        {days.map((item) => (
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDay?.date === item.date && styles.selectedSlot,
            ]}
            key={item.date}
            onPress={() => setSelectedDay(item)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay?.date === item.date && styles.selectedText,
              ]}
            >
              {item.dayName}
            </Text>
            <Text
              style={[
                styles.dateText,
                selectedDay?.date === item.date && styles.selectedText,
              ]}
            >
              {item.fullDate}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Slots */}
      {selectedDay && (
        <>
          <Text style={styles.sectionTitle}>اختر الموعد:</Text>
          <View style={styles.wrap}>
            {timeSlots.map((item) => (
              <TouchableOpacity
                style={[
                  styles.timeSlot,
                  selectedTime?.formattedTime === item.formattedTime &&
                    styles.selectedSlot,
                ]}
                key={item.id.toString()}
                onPress={() => setSelectedTime(item)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime?.formattedTime === item.formattedTime &&
                      styles.selectedText,
                  ]}
                >
                  {item.formattedTime}
                </Text>
                <Text
                  style={[
                    styles.statusText,
                    selectedTime?.formattedTime === item.formattedTime &&
                      styles.selectedText,
                  ]}
                >
                  {item.status === 65 ? "متاح" : "محجوز"}
                  {item.id}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    alignItems: "flex-end",
  },
  wrap: {
    flexDirection: "row-reverse",
    flexWrap: "wrap", // allows wrapping
    // justifyContent: "flex-end",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "right",
  },

  daysContainer: {
    paddingBottom: 16,
    flexDirection: "row-reverse",
    flexWrap: "wrap", // allows wrapping
  },
  dayButton: {
    padding: 12,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    minWidth: "22%",
  },
  selectedSlot: {
    backgroundColor: Colors.SecondaryColor,
  },
  dayText: {
    fontWeight: "bold",
    color: Colors.SecondaryColor,
  },
  selectedText: {
    color: "white",
  },
  dateText: {
    fontSize: 12,
    color: Colors.SecondaryColor,
  },

  timeSlot: {
    padding: 12,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    minWidth: "22%",
  },
  timeText: {
    fontWeight: "bold",
    color: Colors.SecondaryColor,
  },
  statusText: {
    fontSize: 12,
    color: Colors.SecondaryColor,
  },
});
export default BookingScreen;
// Usage example:
// <AppointmentPicker slots={yourDataArray} />
