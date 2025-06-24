import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DaySettingsForm, { AvailableDayInput } from "./DaySettingsForm";
import GenerateSlotsModal from "./GenerateSlotsModal";
import { apiClient } from "../../API/https";

// Types based on the API structure
interface AvailableDay {
  id: number;
  serviceProviderId: number;
  dayOfWeek: number; // 0-6 (Sunday to Saturday)
  startTime: string;
  endTime: string;
  slotDuration: string;
  slotType: number;
  lastGenerationEndDate: string;
}

// API functions (you'll need to implement these based on your API structure)
const AvailableDaysAPI = {
  getAll: async (): Promise<AvailableDay[]> => {
    // Implement GET /api/available-days
    const response = await apiClient.get("/api/available-days");
    return response.data;
  },

  create: async (data: AvailableDayInput): Promise<AvailableDay> => {
    // Implement POST /api/available-days
    const response = await apiClient.post("/api/available-days", data);
    return response.data;
  },

  update: async (
    id: number,
    data: AvailableDayInput
  ): Promise<AvailableDay> => {
    // Implement PUT /api/available-days/:id
    const response = await apiClient.put(`/api/available-days/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    // Implement DELETE /api/available-days/:id
    await apiClient.delete(`/api/available-days/${id}`);
  },
};

const WeeklyAvailabilityManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [daySettings, setDaySettings] = useState<{
    [key: number]: AvailableDayInput;
  }>({});
  const [showGenerateSlotsModal, setShowGenerateSlotsModal] = useState(false);

  const daysOfWeek = [
    { key: 0, name: "الأحد", nameEn: "Sunday" },
    { key: 1, name: "الإثنين", nameEn: "Monday" },
    { key: 2, name: "الثلاثاء", nameEn: "Tuesday" },
    { key: 3, name: "الأربعاء", nameEn: "Wednesday" },
    { key: 4, name: "الخميس", nameEn: "Thursday" },
    { key: 5, name: "الجمعة", nameEn: "Friday" },
    { key: 6, name: "السبت", nameEn: "Saturday" },
  ];

  // Fetch available days
  const {
    data: availableDays,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["available-days"],
    queryFn: AvailableDaysAPI.getAll,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: AvailableDaysAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-days"] });
      Alert.alert("نجح", "تم حفظ إعدادات اليوم بنجاح");
    },
    onError: () => {
      Alert.alert("خطأ", "فشل في حفظ إعدادات اليوم");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AvailableDayInput }) =>
      AvailableDaysAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-days"] });
      Alert.alert("نجح", "تم تحديث إعدادات اليوم بنجاح");
    },
    onError: (error) => {
      Alert.alert(
        "خطأ",
        "لا يمكن تحديث إعدادات اليوم بسبب وجود مواعيد مرتبطة به"
      );
      console.error("Update error:", error.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: AvailableDaysAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["available-days"] });
      Alert.alert("نجح", "تم حذف إعدادات اليوم بنجاح");
    },
    onError: () => {
      Alert.alert(
        "خطأ",
        "لا يمكن حذف إعدادات اليوم بسبب وجود مواعيد مرتبطة به"
      );
    },
  });

  // Initialize day settings from API data
  useEffect(() => {
    if (availableDays) {
      const settings: { [key: number]: AvailableDayInput } = {};
      availableDays.forEach((day) => {
        settings[day.dayOfWeek] = {
          dayOfWeek: day.dayOfWeek,
          startTime: day.startTime,
          endTime: day.endTime,
          slotDuration: day.slotDuration,
          slotType: day.slotType,
        };
      });
      setDaySettings(settings);
    }
  }, [availableDays]);

  const handleDayPress = (dayKey: number) => {
    setSelectedDay(selectedDay === dayKey ? null : dayKey);
  };

  const updateDaySetting = (
    dayKey: number,
    field: keyof AvailableDayInput,
    value: any
  ) => {
    setDaySettings((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        dayOfWeek: dayKey,
        [field]: value,
      },
    }));
  };

  const saveDaySettings = (dayKey: number, settings: AvailableDayInput) => {
    const existingDay = availableDays?.find((day) => day.dayOfWeek === dayKey);

    if (existingDay) {
      updateMutation.mutate({ id: existingDay.id, data: settings });
    } else {
      createMutation.mutate(settings);
    }
  };

  const deleteDaySettings = (dayKey: number) => {
    const existingDay = availableDays?.find((day) => day.dayOfWeek === dayKey);
    if (existingDay) {
      Alert.alert("تأكيد الحذف", "هل أنت متأكد من حذف إعدادات هذا اليوم؟", [
        { text: "إلغاء", style: "cancel" },
        {
          text: "حذف",
          style: "destructive",
          onPress: () => deleteMutation.mutate(existingDay.id),
        },
      ]);
    }
  };

  const isDayConfigured = (dayKey: number) => {
    return availableDays?.some((day) => day.dayOfWeek === dayKey) || false;
  };

  const getConfiguredDaysCount = () => {
    return availableDays?.length || 0;
  };

  const handleGenerateSlots = () => {
    const configuredDays = getConfiguredDaysCount();
    if (configuredDays === 0) {
      Alert.alert(
        "لا توجد أيام مُعدة",
        "يجب إعداد يوم واحد على الأقل قبل إنشاء الفترات الزمنية.",
        [{ text: "موافق" }]
      );
      return;
    }
    setShowGenerateSlotsModal(true);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.mainColor} />
        <Text style={styles.loadingText}>جاري تحميل الإعدادات...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>خطأ في تحميل الإعدادات</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>إدارة الأيام المتاحة</Text>
      <Text style={styles.subtitle}>
        قم بتعديل إعدادات كل يوم من أيام الأسبوع
      </Text>

      {/* Summary and Generate Button */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryInfo}>
          <Text style={styles.summaryText}>
            الأيام المُعدة: {getConfiguredDaysCount()} من 7
          </Text>
          <Text style={styles.summaryNote}>
            {getConfiguredDaysCount() > 0
              ? "يمكنك الآن إنشاء الفترات الزمنية"
              : "قم بإعداد الأيام أولاً"}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.generateButton,
            getConfiguredDaysCount() === 0 && styles.generateButtonDisabled,
          ]}
          onPress={handleGenerateSlots}
          disabled={getConfiguredDaysCount() === 0}
        >
          <Text
            style={[
              styles.generateButtonText,
              getConfiguredDaysCount() === 0 &&
                styles.generateButtonTextDisabled,
            ]}
          >
            إنشاء الفترات
          </Text>
        </TouchableOpacity>
      </View>

      {daysOfWeek.map((day) => (
        <View key={day.key} style={styles.dayContainer}>
          <TouchableOpacity
            style={[
              styles.dayHeader,
              isDayConfigured(day.key) && styles.dayHeaderConfigured,
              selectedDay === day.key && styles.dayHeaderSelected,
            ]}
            onPress={() => handleDayPress(day.key)}
          >
            <View style={styles.dayHeaderContent}>
              <Text
                style={[
                  styles.dayName,
                  isDayConfigured(day.key) && styles.dayNameConfigured,
                ]}
              >
                {day.name}
              </Text>
              <View style={styles.dayStatus}>
                {isDayConfigured(day.key) ? (
                  <Text style={styles.statusConfigured}>مُعد</Text>
                ) : (
                  <Text style={styles.statusNotConfigured}>غير مُعد</Text>
                )}
              </View>
            </View>
            <Text style={styles.expandIcon}>
              {selectedDay === day.key ? "−" : "+"}
            </Text>
          </TouchableOpacity>

          {selectedDay === day.key && (
            <View style={styles.daySettings}>
              <DaySettingsForm
                dayKey={day.key}
                settings={daySettings[day.key]}
                onUpdateSetting={updateDaySetting}
                onSave={(settings) => saveDaySettings(day.key, settings)}
                onDelete={() => deleteDaySettings(day.key)}
                isConfigured={isDayConfigured(day.key)}
                isSaving={createMutation.isPending || updateMutation.isPending}
                isDeleting={deleteMutation.isPending}
              />
            </View>
          )}
        </View>
      ))}

      {/* Generate Slots Modal */}
      <GenerateSlotsModal
        visible={showGenerateSlotsModal}
        onClose={() => setShowGenerateSlotsModal(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    ...(font.body || { fontSize: 16 }),
    marginTop: 10,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  errorText: {
    ...(font.body || { fontSize: 16 }),
    color: Colors.invalidColor200 || "red",
  },
  title: {
    ...(font.title || { fontSize: 24, fontWeight: "bold" }),
    color: Colors.SecondaryColor || "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    ...(font.body || { fontSize: 16 }),
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  summaryContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  summaryInfo: {
    flex: 1,
  },
  summaryText: {
    ...(font.subtitle || { fontSize: 16 }),
    color: "#333",
    fontWeight: "600",
    marginBottom: 4,
  },
  summaryNote: {
    ...(font.Caption || { fontSize: 12 }),
    color: "#666",
  },
  generateButton: {
    backgroundColor: Colors.mainColor || "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 12,
  },
  generateButtonDisabled: {
    backgroundColor: "#E9ECEF",
  },
  generateButtonText: {
    ...(font.Button || { fontSize: 14, fontWeight: "600" }),
    color: "#FFFFFF",
  },
  generateButtonTextDisabled: {
    color: "#6C757D",
  },
  dayContainer: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    overflow: "hidden",
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  dayHeaderConfigured: {
    backgroundColor: "#E8F5E8",
    borderColor: "#28A745",
  },
  dayHeaderSelected: {
    backgroundColor: "#E3F2FD",
    borderColor: Colors.mainColor || "#007AFF",
  },
  dayHeaderContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayName: {
    ...(font.subtitle || { fontSize: 18, fontWeight: "600" }),
    color: "#333",
  },
  dayNameConfigured: {
    color: "#28A745",
  },
  dayStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusConfigured: {
    ...(font.Caption || { fontSize: 12 }),
    color: "#28A745",
    backgroundColor: "rgba(40, 167, 69, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusNotConfigured: {
    ...(font.Caption || { fontSize: 12 }),
    color: "#6C757D",
    backgroundColor: "rgba(108, 117, 125, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  expandIcon: {
    ...(font.title || { fontSize: 20 }),
    color: "#666",
    marginLeft: 10,
  },
  daySettings: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
});

export default WeeklyAvailabilityManager;
