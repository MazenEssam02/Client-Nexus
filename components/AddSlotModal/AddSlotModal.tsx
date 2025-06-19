import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert, // For showing errors/success
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Colors } from "../../constants/Color"; // Assuming you have this
import { font } from "../../constants/Font"; // Assuming you have this
import { Slots } from "../../API/https";
import { useQueryClient } from "@tanstack/react-query";

interface AddSlotModalProps {
  date: Date;
  visible: boolean;
  onClose: () => void;
  onSubmit: (timestamp: string) => Promise<void>; // Returns a promise to handle loading
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({
  visible,
  date,
  onClose,
  onSubmit,
}) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when modal becomes visible
  useEffect(() => {
    if (visible) {
      setSelectedDate(new Date()); // Reset to current date/time when modal opens
      setIsLoading(false);
      setError(null);
      setShowTimePicker(false);
    }
  }, [visible]);

  const handleTimeChange = (event: DateTimePickerEvent, time?: Date): void => {
    setShowTimePicker(Platform.OS === "ios");
    if (time) {
      const currentTime = time || selectedDate;
      // Combine selected date with selected time
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(currentTime.getHours());
      newDateTime.setMinutes(currentTime.getMinutes());
      newDateTime.setSeconds(currentTime.getSeconds());
      setSelectedDate(newDateTime);
      if (Platform.OS === "android") {
        setShowTimePicker(false); // Close after selection on Android
      }

      if (time < new Date()) {
        // If the selected time is in the past, show an error
        setError("الوقت المختار يجب أن يكون في المستقبل.");
        return;
      } else {
        setError(null); // Clear error if time is valid
      }
    } else {
      setShowTimePicker(false); // User cancelled on Android
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Format the date to ISO string or any format your API expects
      // .toISOString() produces UTC: "2023-10-27T10:30:00.000Z"
      const timezoneOffset = new Date().getTimezoneOffset() * 60000; // Offset in milliseconds
      const timestamp = new Date(
        selectedDate.getTime() - timezoneOffset
      ).toISOString(); // Adjust for local timezone
      console.log("Submitting slot with timestamp:", timestamp);
      await Slots.create({
        date: timestamp,
        slotType: 80,
      });
      await queryClient.invalidateQueries({
        queryKey: ["slots", firstDayOfMonth],
      });
      Alert.alert("نجاح", "تم إنشاء الفترة الزمنية بنجاح.");
      onClose(); // Close modal on success
    } catch (apiError: any) {
      setError(apiError.message || "فشل إنشاء الفترة الزمنية. حاول مرة أخرى.");
      Alert.alert(
        "خطأ",
        apiError.message || "فشل إنشاء الفترة الزمنية. حاول مرة أخرى."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openTimePicker = () => {
    setShowTimePicker(true);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {
        if (!isLoading) onClose();
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>إنشاء فترة زمنية جديدة</Text>

          <Text style={styles.label}>التاريخ والوقت المختار:</Text>
          <TouchableOpacity
            style={styles.dateDisplayTouchable}
            onPress={openTimePicker} // Open date picker first
            disabled={isLoading}
          >
            <Text style={styles.dateDisplay}>
              {selectedDate.toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Text>
          </TouchableOpacity>

          {/* Time Picker */}
          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={selectedDate} // Use selectedDate to pre-fill time part
              mode="time"
              is24Hour={false}
              minuteInterval={15}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleTimeChange}
              timeZoneName="Africa/Cairo"
            />
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>إلغاء</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
              disabled={isLoading || !selectedDate || !!error}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={"#FFFFFF"} />
              ) : (
                <Text style={styles.buttonText}>إنشاء</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "stretch", // Changed from 'center' to 'stretch' for full-width elements
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    ...font.title,
    color: Colors.SecondaryColor || "#333333",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    ...(font.subtitle || { fontSize: 16 }),
    color: "#555555",
    textAlign: "right",
    marginBottom: 8,
    marginTop: 10,
  },
  dateDisplayTouchable: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginBottom: 15,
  },
  dateDisplay: {
    ...(font.body || { fontSize: 16 }),
    textAlign: "center",
  },
  pickerButtonsContainer: {
    flexDirection: "row-reverse", // RTL friendly
    justifyContent: "space-between",
    marginBottom: Platform.OS === "ios" ? 0 : 20, // More space if pickers are not inline
  },
  pickerButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  datePickerButton: {
    backgroundColor: Colors.SecondaryColor || "#5bc0de", // Example color
    borderColor: Colors.SecondaryColor || "#46b8da",
    marginRight: Platform.OS === "ios" ? 5 : 0, // Adjust spacing for RTL
    marginLeft: 5, // LTR: 5px to the right, RTL: 5px to the left
  },
  errorText: {
    ...(font.Caption || { fontSize: 14 }),
    color: Colors.invalidColor200 || "red",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: "row-reverse", // RTL friendly
    justifyContent: "space-between", // Puts buttons at opposite ends
    marginTop: 25,
  },
  button: {
    flex: 1, // Make buttons take equal width
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5, // Space between buttons
  },
  cancelButton: {
    backgroundColor: "#AAAAAA",
    borderColor: "#888888",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: Colors.mainColor || "#007AFF",
  },
  buttonText: {
    ...(font.Button || { fontSize: 16, fontWeight: "bold" }),
    color: "#FFFFFF",
  },
});

export default AddSlotModal;
