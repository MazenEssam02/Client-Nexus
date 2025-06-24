import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Dropdown from "react-native-input-select";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";

// Types
export interface AvailableDayInput {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration: string;
  slotType: number;
}

interface DaySettingsFormProps {
  dayKey: number;
  settings?: AvailableDayInput;
  onUpdateSetting: (
    dayKey: number,
    field: keyof AvailableDayInput,
    value: any
  ) => void;
  onSave: (settings: AvailableDayInput) => void;
  onDelete: () => void;
  isConfigured: boolean;
  isSaving: boolean;
  isDeleting: boolean;
}

const DaySettingsForm: React.FC<DaySettingsFormProps> = ({
  dayKey,
  settings,
  onUpdateSetting,
  onSave,
  onDelete,
  isConfigured,
  isSaving,
  isDeleting,
}) => {
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [durationHours, setDurationHours] = useState(1);
  const [durationMinutes, setDurationMinutes] = useState(0);

  //   set the default settings depending on the timezone
  const timeZoneOffset = new Date().getTimezoneOffset() * 60000; // Offset in milliseconds
  const defaultStartTime = new Date();
  defaultStartTime.setHours(9, 0, 0); // Default to 09:00
  defaultStartTime.setTime(defaultStartTime.getTime() + timeZoneOffset);
  const defaultEndTime = new Date();
  defaultEndTime.setHours(17, 0, 0); // Default to 17:00
  defaultEndTime.setTime(defaultEndTime.getTime() + timeZoneOffset);

  const defaultSettings: AvailableDayInput = {
    dayOfWeek: dayKey,
    startTime: defaultStartTime.toTimeString().slice(0, 5), // HH:MM format
    endTime: defaultEndTime.toTimeString().slice(0, 5), // HH:MM format
    slotDuration: "01:00:00",
    slotType: 73,
  };

  const currentSettings = {
    ...defaultSettings,
    ...(settings || {}),
  };

  // Service type options
  const serviceTypeOptions = [
    { label: "في المكتب", value: 73 },
    { label: "هاتف", value: 80 },
    { label: "عبر الإنترنت", value: 79 },
  ];

  // Parse duration string to hours and minutes
  const parseDuration = (duration: string) => {
    const parts = duration.split(":");
    return {
      hours: parseInt(parts[0] || "1", 10),
      minutes: parseInt(parts[1] || "0", 10),
    };
  };

  // Format duration to string
  const formatDuration = (hours: number, minutes: number) => {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  };

  // Initialize duration state from current settings
  React.useEffect(() => {
    const { hours, minutes } = parseDuration(currentSettings.slotDuration);
    setDurationHours(hours);
    setDurationMinutes(minutes);
  }, [currentSettings.slotDuration]);

  // Time picker handlers
  const handleStartTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    setShowStartTimePicker(Platform.OS === "ios");
    if (time) {
      const timeString = time.toTimeString().slice(0, 5); // HH:MM format
      onUpdateSetting(dayKey, "startTime", timeString);
    }
    if (Platform.OS === "android") {
      setShowStartTimePicker(false);
    }
  };

  const handleEndTimeChange = (event: DateTimePickerEvent, time?: Date) => {
    setShowEndTimePicker(Platform.OS === "ios");
    if (time) {
      const timeString = time.toTimeString().slice(0, 5); // HH:MM format
      onUpdateSetting(dayKey, "endTime", timeString);
    }
    if (Platform.OS === "android") {
      setShowEndTimePicker(false);
    }
  };

  // Convert time string to Date object for picker
  const timeStringToDate = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
  };

  // Duration adjustment functions
  const incrementDurationHours = () => {
    const newHours = Math.min(durationHours + 1, 12);
    setDurationHours(newHours);
    onUpdateSetting(
      dayKey,
      "slotDuration",
      formatDuration(newHours, durationMinutes)
    );
  };

  const decrementDurationHours = () => {
    const newHours = Math.max(durationHours - 1, 0);
    setDurationHours(newHours);
    onUpdateSetting(
      dayKey,
      "slotDuration",
      formatDuration(newHours, durationMinutes)
    );
  };

  const incrementDurationMinutes = () => {
    let newMinutes = durationMinutes + 15;
    if (newMinutes >= 60) {
      newMinutes = 0;
    }
    setDurationMinutes(newMinutes);
    onUpdateSetting(
      dayKey,
      "slotDuration",
      formatDuration(durationHours, newMinutes)
    );
  };

  const decrementDurationMinutes = () => {
    let newMinutes = durationMinutes - 15;
    if (newMinutes < 0) {
      newMinutes = 45;
    }
    setDurationMinutes(newMinutes);
    onUpdateSetting(
      dayKey,
      "slotDuration",
      formatDuration(durationHours, newMinutes)
    );
  };

  // Validation
  const isFormValid = () => {
    const startTime = currentSettings.startTime;
    const endTime = currentSettings.endTime;
    const duration = currentSettings.slotDuration;

    // Check if end time is after start time
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    if (endTotalMinutes <= startTotalMinutes) {
      return false;
    }

    // Check if duration is not zero
    if (duration === "00:00:00") {
      return false;
    }

    return true;
  };

  //   create shownStartTime which is just the start time but adjusted for the time zone
  const shownStartTime = timeStringToDate(currentSettings.startTime);
  const shownEndTime = timeStringToDate(currentSettings.endTime);
  shownStartTime.setTime(shownStartTime.getTime() - timeZoneOffset);
  shownEndTime.setTime(shownEndTime.getTime() - timeZoneOffset);

  return (
    <View style={styles.settingsForm}>
      {/* Time Selection */}
      <View style={styles.timeRow}>
        <View style={styles.timeInput}>
          <Text style={styles.inputLabel}>وقت البداية</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowStartTimePicker(true)}
          >
            <Text style={styles.timeText}>
              {shownStartTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeInput}>
          <Text style={styles.inputLabel}>وقت النهاية</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowEndTimePicker(true)}
          >
            <Text style={styles.timeText}>
              {shownEndTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Time Pickers */}
      {showStartTimePicker && (
        <DateTimePicker
          testID="startTimePicker"
          value={timeStringToDate(currentSettings.startTime)}
          mode="time"
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleStartTimeChange}
        />
      )}

      {showEndTimePicker && (
        <DateTimePicker
          testID="endTimePicker"
          value={timeStringToDate(currentSettings.endTime)}
          mode="time"
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleEndTimeChange}
        />
      )}

      {/* Duration Selection */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>مدة الفترة (دقائق : ساعات)</Text>
        <View style={styles.durationContainer}>
          {/* Hours */}
          <View style={styles.durationSection}>
            <TouchableOpacity
              style={styles.durationButton}
              onPress={incrementDurationHours}
            >
              <Text style={styles.durationButtonText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.durationValue}>
              {durationHours.toString().padStart(2, "0")}
            </Text>
            <TouchableOpacity
              style={styles.durationButton}
              onPress={decrementDurationHours}
            >
              <Text style={styles.durationButtonText}>-</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.durationSeparator}>:</Text>

          {/* Minutes */}
          <View style={styles.durationSection}>
            <TouchableOpacity
              style={styles.durationButton}
              onPress={incrementDurationMinutes}
            >
              <Text style={styles.durationButtonText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.durationValue}>
              {durationMinutes.toString().padStart(2, "0")}
            </Text>
            <TouchableOpacity
              style={styles.durationButton}
              onPress={decrementDurationMinutes}
            >
              <Text style={styles.durationButtonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Service Type Selection */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>نوع الخدمة</Text>
        <Dropdown
          placeholder="اختر نوع الخدمة"
          options={serviceTypeOptions}
          selectedValue={currentSettings.slotType}
          onValueChange={(value) => onUpdateSetting(dayKey, "slotType", value)}
          primaryColor={Colors.mainColor || "#007AFF"}
          dropdownStyle={styles.dropdown}
          selectedItemStyle={styles.selectedItem}
          multipleSelectedItemStyle={styles.selectedItem}
          dropdownContainerStyle={styles.dropdownContainer}
        />
      </View>

      {/* Validation Error */}
      {!isFormValid() && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            تأكد من أن وقت النهاية بعد وقت البداية وأن المدة ليست صفر
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!isFormValid() || isSaving) && styles.buttonDisabled,
          ]}
          onPress={() => onSave(currentSettings)}
          disabled={!isFormValid() || isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>
              {isConfigured ? "تحديث" : "حفظ"}
            </Text>
          )}
        </TouchableOpacity>

        {isConfigured && (
          <TouchableOpacity
            style={[styles.deleteButton, isDeleting && styles.buttonDisabled]}
            onPress={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.deleteButtonText}>حذف</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsForm: {
    gap: 16,
  },
  timeRow: {
    flexDirection: "row-reverse",
    gap: 12,
  },
  timeInput: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 8,
  },
  inputLabel: {
    ...(font.body || { fontSize: 14 }),
    color: "#555",
    marginBottom: 8,
    textAlign: "right",
    fontWeight: "500",
  },
  timeButton: {
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  timeText: {
    ...(font.body || { fontSize: 16 }),
    textAlign: "center",
    color: "#333",
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    padding: 12,
  },
  durationSection: {
    alignItems: "center",
    gap: 8,
  },
  durationButton: {
    backgroundColor: "#E9ECEF",
    borderRadius: 6,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  durationButtonText: {
    ...(font.body || { fontSize: 16 }),
    fontWeight: "bold",
    color: "#495057",
  },
  durationValue: {
    ...(font.body || { fontSize: 18 }),
    fontWeight: "600",
    color: "#333",
    minWidth: 30,
    textAlign: "center",
  },
  durationSeparator: {
    ...(font.body || { fontSize: 18 }),
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 16,
  },
  dropdown: {
    borderColor: "#DEE2E6",
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
  },
  dropdownIcon: {
    tintColor: "#666",
  },
  selectedItem: {
    color: Colors.mainColor || "#007AFF",
    fontWeight: "500",
  },
  dropdownContainer: {
    borderColor: "#DEE2E6",
    borderRadius: 8,
  },
  errorContainer: {
    backgroundColor: "#FFF3CD",
    borderColor: "#FFEAA7",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    ...(font.Caption || { fontSize: 12 }),
    color: "#856404",
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  saveButton: {
    flex: 1,
    padding: 14,
    backgroundColor: Colors.mainColor || "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  saveButtonText: {
    ...(font.Button || { fontSize: 16, fontWeight: "600" }),
    color: "#FFFFFF",
  },
  deleteButton: {
    flex: 1,
    padding: 14,
    backgroundColor: "#DC3545",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  deleteButtonText: {
    ...(font.Button || { fontSize: 16, fontWeight: "600" }),
    color: "#FFFFFF",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default DaySettingsForm;
