import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { Slots } from "../../API/https";
import { useQuery } from "@tanstack/react-query";
import IsLoading from "../IsLoading/IsLoading";
import IsError from "../IsError/IsError";
import { Arrow } from "../Icons/Arrow";
import timeZoneConverter from "../../utils/timeZoneConverter";

const BookingSlotsPicker = ({ setSlot, typeNo, spId }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 7))
      .toISOString()
      .split("T")[0]
  );
  const {
    data: slotsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["slots", spId, startDate, endDate, typeNo],
    queryFn: () =>
      Slots.getWeek({
        serviceProviderId: spId,
        startDate: startDate,
        endDate: endDate,
        type: typeNo,
      }),
  });

  if (isLoading) {
    return (
      <View style={{ marginTop: 20 }}>
        <IsLoading />
      </View>
    );
  }

  if (isError) {
    return <IsError error={error} />;
  }
  const slots = slotsData.data;
  const slotPressHandler = (item) => {
    setSelectedTime(item);
    setSlot(item.id);
  };
  const dayPressHandler = (item) => {
    setSelectedDay(item);
    setSelectedTime(null);
    setSlot(null);
  };
  const shiftWeek = (days) => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() + days);
    const newStartStr = newStart.toISOString().split("T")[0];

    const newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + 7);
    const newEndStr = newEnd.toISOString().split("T")[0];

    setStartDate(newStartStr);
    setEndDate(newEndStr);
    setSelectedDay(null);
    setSelectedTime(null);
    setSlot(null);
  };
  // 1. Extract unique days from the slots
  type Day = {
    date: string;
    dayName: string;
    fullDate: string;
  };

  const getUniqueDays = (): Day[] => {
    const daysMap: Record<string, Day> = {};
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
        const time = timeZoneConverter(slot.date);
        return {
          ...slot,
          formattedTime: time,
          timestamp: new Date(slot.date).getTime(),
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp);
  };

  const days: Day[] = getUniqueDays();
  const timeSlots = getTimeSlotsForDay();

  return (
    <View style={styles.container}>
      {/* Day Picker */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          onPress={() => shiftWeek(-7)}
          style={styles.navButton}
          disabled={startDate === new Date().toISOString().split("T")[0]}
        >
          <Arrow fillColor={Colors.mainColor} rotation={180} />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>اختر اليوم</Text>
        <TouchableOpacity onPress={() => shiftWeek(7)} style={styles.navButton}>
          <Arrow fillColor={Colors.mainColor} onPress={() => shiftWeek(7)} />
        </TouchableOpacity>
      </View>
      <View style={styles.daysContainer}>
        {!days.length ? (
          <Text style={styles.unavaliableText}>لا توجد مواعيد</Text>
        ) : (
          days.map((item) => (
            <TouchableOpacity
              style={[
                styles.dayButton,
                selectedDay?.date === item.date && styles.selectedSlot,
              ]}
              key={item.date}
              onPress={() => dayPressHandler(item)}
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
          ))
        )}
      </View>

      {/* Time Slots */}
      {selectedDay && !!days.length && (
        <>
          <Text style={styles.sectionTitle}>اختر الموعد</Text>
          <View style={styles.wrap}>
            {timeSlots.map((item) => (
              <TouchableOpacity
                style={[
                  styles.timeSlot,
                  item.status === 65
                    ? selectedTime?.formattedTime === item.formattedTime &&
                      styles.selectedSlot
                    : styles.invalidSlot,
                ]}
                key={item.id.toString()}
                onPress={
                  item.status === 65 ? () => slotPressHandler(item) : null
                }
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
    // alignItems: "flex-end",
    padding: 8,
  },
  wrap: {
    flexDirection: "row-reverse",
    flexWrap: "wrap", // allows wrapping
  },
  sectionTitle: {
    ...font.title,
    // width: "100%",
    marginBottom: 12,
    textAlign: "center",
  },
  unavaliableText: {
    ...font.title,
    width: "100%",
    marginVertical: 10,
    textAlign: "center",
  },
  navButtons: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  navButton: {
    // backgroundColor: Colors.mainColor,
    padding: 10,
    borderRadius: 8,
  },
  navButtonText: {
    ...font.subtitle,
    color: "#fff",
  },

  daysContainer: {
    paddingBottom: 16,
    flexDirection: "row-reverse",
    flexWrap: "wrap", // allows wrapping
  },
  dayButton: {
    padding: 12,
    margin: 5,
    backgroundColor: Colors.background,
    borderRadius: 8,
    alignItems: "center",
    minWidth: "22%",
  },
  selectedSlot: {
    backgroundColor: Colors.mainColor,
  },
  dayText: {
    ...font.body,
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
    backgroundColor: Colors.background,
    borderRadius: 8,
    alignItems: "center",
    minWidth: "22%",
  },
  invalidSlot: {
    backgroundColor: Colors.gray500,
  },
  timeText: {
    ...font.body,
    color: Colors.SecondaryColor,
  },
  statusText: {
    fontSize: 12,
    color: Colors.SecondaryColor,
  },
});
export default BookingSlotsPicker;
