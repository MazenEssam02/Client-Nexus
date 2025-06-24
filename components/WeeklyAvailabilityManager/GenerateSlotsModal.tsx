import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Slots } from "../../API/https";

interface GenerateSlotsModalProps {
  visible: boolean;
  onClose: () => void;
}

interface GenerateSlotsRequest {
  startDate: string;
  endDate: string;
}

const GenerateSlotsModal: React.FC<GenerateSlotsModalProps> = ({
  visible,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30); // Default to 30 days from now
    return date;
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Generate slots mutation
  const generateSlotsMutation = useMutation({
    mutationFn: Slots.generate,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["slots"] });
      queryClient.invalidateQueries({ queryKey: ["available-days"] });

      Alert.alert(
        "نجح إنشاء الفترات",
        `تم إنشاء الفترات الزمنية بنجاح من ${formatDate(
          startDate
        )} إلى ${formatDate(endDate)}`,
        [
          {
            text: "موافق",
            onPress: onClose,
          },
        ]
      );
    },
    onError: (error: any) => {
      Alert.alert(
        "خطأ في إنشاء الفترات",
        error.message ||
          "فشل في إنشاء الفترات الزمنية. تأكد من أن لديك أيام متاحة مُعدة.",
        [{ text: "موافق" }]
      );
    },
  });

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateISO = (date: Date): string => {
    return date.toISOString();
  };

  const handleStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowStartDatePicker(false);
    if (date) {
      setStartDate(date);
      // If start date is after end date, adjust end date
      if (date > endDate) {
        const newEndDate = new Date(date);
        newEndDate.setDate(newEndDate.getDate() + 7); // Add 7 days
        setEndDate(newEndDate);
      }
    }
  };

  const handleEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowEndDatePicker(false);
    if (date) {
      // Ensure end date is not before start date
      if (date >= startDate) {
        setEndDate(date);
      } else {
        Alert.alert("خطأ", "تاريخ النهاية يجب أن يكون بعد تاريخ البداية");
      }
    }
  };

  const handleGenerateSlots = () => {
    if (startDate >= endDate) {
      Alert.alert("خطأ", "تاريخ النهاية يجب أن يكون بعد تاريخ البداية");
      return;
    }

    const daysDifference = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysDifference > 365) {
      Alert.alert(
        "تحذير",
        "الفترة المحددة طويلة جداً. يُنصح بأن تكون أقل من سنة واحدة."
      );
      return;
    }

    Alert.alert(
      "تأكيد إنشاء الفترات",
      `هل أنت متأكد من إنشاء الفترات الزمنية من ${formatDate(
        startDate
      )} إلى ${formatDate(
        endDate
      )}؟\n\nسيتم إنشاء الفترات بناءً على الأيام المتاحة المُعدة مسبقاً.`,
      [
        { text: "إلغاء", style: "cancel" },
        {
          text: "إنشاء",
          onPress: () => {
            generateSlotsMutation.mutate({
              startDate: formatDateISO(startDate),
              endDate: formatDateISO(endDate),
            });
          },
        },
      ]
    );
  };

  const isFormValid = () => {
    return startDate < endDate && !generateSlotsMutation.isPending;
  };

  const getDaysDifference = () => {
    return Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {
        if (!generateSlotsMutation.isPending) onClose();
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>إنشاء الفترات الزمنية</Text>
          <Text style={styles.modalSubtitle}>
            حدد الفترة الزمنية لإنشاء الفترات المتاحة بناءً على إعدادات الأيام
          </Text>

          {/* Start Date */}
          <View style={styles.dateSection}>
            <Text style={styles.label}>تاريخ البداية</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowStartDatePicker(true)}
              disabled={generateSlotsMutation.isPending}
            >
              <Text style={styles.dateText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>
          </View>

          {/* End Date */}
          <View style={styles.dateSection}>
            <Text style={styles.label}>تاريخ النهاية</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEndDatePicker(true)}
              disabled={generateSlotsMutation.isPending}
            >
              <Text style={styles.dateText}>{formatDate(endDate)}</Text>
            </TouchableOpacity>
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <Text style={styles.infoText}>
              📅 عدد الأيام: {getDaysDifference()} يوم
            </Text>
            <Text style={styles.infoNote}>
              سيتم إنشاء الفترات بناءً على الأيام المتاحة المُعدة في الإعدادات
              الأسبوعية
            </Text>
          </View>

          {/* Date Pickers */}
          {showStartDatePicker && (
            <DateTimePicker
              testID="startDatePicker"
              value={startDate}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
              minimumDate={new Date()}
            />
          )}

          {showEndDatePicker && (
            <DateTimePicker
              testID="endDatePicker"
              value={endDate}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
              minimumDate={startDate}
            />
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={generateSlotsMutation.isPending}
            >
              <Text style={styles.cancelButtonText}>إلغاء</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.generateButton,
                !isFormValid() && styles.buttonDisabled,
              ]}
              onPress={handleGenerateSlots}
              disabled={!isFormValid()}
            >
              {generateSlotsMutation.isPending ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.generateButtonText}>إنشاء الفترات</Text>
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
    marginBottom: 8,
  },
  modalSubtitle: {
    ...(font.body || { fontSize: 14 }),
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  dateSection: {
    marginBottom: 20,
  },
  label: {
    ...(font.subtitle || { fontSize: 16 }),
    color: "#555",
    marginBottom: 8,
    textAlign: "right",
    fontWeight: "500",
  },
  dateButton: {
    backgroundColor: "#F8F9FA",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  dateText: {
    ...(font.body || { fontSize: 16 }),
    textAlign: "center",
    color: "#333",
  },
  infoSection: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#BBDEFB",
  },
  infoText: {
    ...(font.body || { fontSize: 14 }),
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 4,
    fontWeight: "500",
  },
  infoNote: {
    ...(font.Caption || { fontSize: 12 }),
    color: "#1976D2",
    textAlign: "center",
    lineHeight: 16,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  cancelButton: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  cancelButtonText: {
    ...(font.Button || { fontSize: 16, fontWeight: "600" }),
    color: "#6C757D",
  },
  generateButton: {
    backgroundColor: Colors.mainColor || "#007AFF",
  },
  generateButtonText: {
    ...(font.Button || { fontSize: 16, fontWeight: "600" }),
    color: "#FFFFFF",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default GenerateSlotsModal;
