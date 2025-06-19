import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  FlatList,
} from "react-native";
import ScreensWrapper from "../ScreensWrapper/ScreensWrapper";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useQuery } from "@tanstack/react-query";
import { Client, ServiceProvider, Slots } from "../../API/https";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import IsError from "../../components/IsError/IsError";
import ScheduleLawyerCard from "../../components/ScheduleCard/ScheduleLawyerCard";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import timeZoneConverter from "../../utils/timeZoneConverter";

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
            ...item,
            client: client.data.data,
            ...slot.data,
          };
        })
      );
      return fullItems;
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <IsError error={error} />;
  }
  console.log(JSON.stringify(data, null, 2));

  return (
    <ScreensWrapper>
      <FlatList
        data={data.sort(
          (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )}
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
                  (new Date(item.date) > new Date()
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
        keyExtractor={(item) => item.id}
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
  keyboardContainer: {
    flex: 1,
    minHeight: "100%",
  },
  pressed: {
    opacity: 0.3,
  },
  optionContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  editText: {
    fontFamily: font.title.fontFamily,
    fontSize: font.title.fontSize,
    color: Colors.mainColor,
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
