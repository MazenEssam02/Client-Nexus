import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { Slots, slotTypes } from "../../API/https";
import { useQueryClient } from "@tanstack/react-query";
import Dropdown from "react-native-input-select";

interface AddSlotModalProps {
  date: Date;
  visible: boolean;
  onClose: () => void;
  onSubmit: (timestamp: string) => Promise<void>;
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({
  visible,
  date,
  onClose,
  onSubmit,
}) => {
  const queryClient = useQueryClient();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<number | null>(80);

  // Keep seconds internally, user never edits them
  const [durationHours, setDurationHours] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const durationSeconds = 0; // Always 0 internally

  // Reset state when modal becomes visible
  useEffect(() => {
    if (visible) {
      setSelectedDate(date);
      setIsLoading(false);
      setError(null);
      setShowTimePicker(false);

      setDurationHours(0);
      setDurationMinutes(0);
    }
  }, [visible, date]);

  const handleTimeChange = (event: DateTimePickerEvent, time: Date): void => {
    setShowTimePicker(Platform.OS === "ios");
    if (time) {
      const currentTime = time || date;
      const newDateTime = new Date(date);
      newDateTime.setHours(currentTime.getHours());
      newDateTime.setMinutes(currentTime.getMinutes());
      newDateTime.setSeconds(currentTime.getSeconds());
      setSelectedDate(newDateTime);

      if (Platform.OS === "android") {
        setShowTimePicker(false);
      }
      if (time < new Date()) {
        setError("الوقت المختار يجب أن يكون في المستقبل.");
        return;
      } else {
        setError(null);
      }
    } else {
      setShowTimePicker(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    // Combine duration fields into one string (internally keep seconds)
    const duration = `${String(durationHours).padStart(2, "0")}:${String(
      durationMinutes
    ).padStart(2, "0")}:${String(durationSeconds).padStart(2, "0")}`;

    try {
      await Slots.create({
        date: selectedDate,
        slotType: type || 80,
        duration,
      });
      await queryClient.invalidateQueries({
        queryKey: ["slots", firstDayOfMonth],
      });
      Alert.alert("نجاح", "تم إنشاء الفترة الزمنية بنجاح.");
      onClose();
    } catch (apiError: any) {
      setError("فشل إنشاء الفترة الزمنية. حاول مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  const openTimePicker = () => {
    setShowTimePicker(true);
  };

  // Increment and decrement minutes in steps of 5
  const incrementMinutes = () => {
    let newMinutes = durationMinutes + 5;
    if (newMinutes >= 60) newMinutes = 0;
    setDurationMinutes(newMinutes);
  };

  const decrementMinutes = () => {
    let newMinutes = durationMinutes - 5;
    if (newMinutes < 0) newMinutes = 55;
    setDurationMinutes(newMinutes);
  };

  // Increment and decrement hours
  const incrementHours = () => {
    let newHours = durationHours + 1;
    if (newHours > 23) newHours = 0;
    setDurationHours(newHours);
  };

  const decrementHours = () => {
    let newHours = durationHours - 1;
    if (newHours < 0) newHours = 23;
    setDurationHours(newHours);
  };

  const isSubmitDisabled =
    isLoading || !type || (durationHours === 0 && durationMinutes === 0);

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
            onPress={openTimePicker}
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

          <Dropdown
            placeholder="اختر نوع الخدمة"
            options={
              Object.keys(slotTypes).map((key) => ({
                label:
                  slotTypes[key] === 80
                    ? "هاتف"
                    : slotTypes[key] === 73
                    ? "في المكتب"
                    : "عبر الإنترنت",
                value: slotTypes[key],
              })) || []
            }
            disabled={isLoading}
            selectedValue={type}
            onValueChange={(itemValue) => {
              setType(itemValue as number);
            }}
          />

          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              themeVariant="light"
              value={selectedDate}
              mode="time"
              is24Hour={false}
              minuteInterval={5}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleTimeChange}
              timeZoneName="Africa/Cairo"
            />
          )}

          <Text style={styles.label}>المدة (دقائق : ساعات):</Text>
          <View style={styles.durationContainer}>
            <View style={styles.hoursContainer}>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={incrementHours}
                disabled={isLoading}
              >
                <Text style={styles.arrowText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.hoursDisplay}>
                {durationHours.toString().padStart(2, "0")}
              </Text>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={decrementHours}
                disabled={isLoading}
              >
                <Text style={styles.arrowText}>-</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.durationSeparator}>:</Text>
            <View style={styles.minutesContainer}>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={incrementMinutes}
                disabled={isLoading}
              >
                <Text style={styles.arrowText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.minutesDisplay}>
                {durationMinutes.toString().padStart(2, "0")}
              </Text>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={decrementMinutes}
                disabled={isLoading}
              >
                <Text style={styles.arrowText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>

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
              style={[
                styles.button,
                styles.submitButton,
                isSubmitDisabled && styles.cancelButton,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitDisabled}
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
    alignItems: "stretch",
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
  errorText: {
    ...(font.Caption || { fontSize: 14 }),
    color: Colors.invalidColor200 || "red",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 25,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
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
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  durationSeparator: {
    fontSize: 18,
    marginHorizontal: 5,
    color: "#333",
  },
  // Hours
  hoursContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  hoursDisplay: {
    ...(font.body || { fontSize: 16 }),
    marginHorizontal: 10,
    width: 30,
    textAlign: "center",
  },
  // Minutes
  minutesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  minutesDisplay: {
    ...(font.body || { fontSize: 16 }),
    marginHorizontal: 10,
    width: 30,
    textAlign: "center",
  },
  arrowButton: {
    backgroundColor: "#e6e6e6",
    padding: 5,
    borderRadius: 4,
  },
  arrowText: {
    ...(font.body || { fontSize: 16 }),
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 4,
  },
});

export default AddSlotModal;
