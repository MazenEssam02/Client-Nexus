import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
  Linking,
} from "react-native";
import { Colors } from "../../constants/Color";
import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { Client, EmeregencyCases, ServiceProvider } from "../../API/https";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import EmergencyCallBlock from "../../components/EmergencyCallBlock/EmergencyCallBlock";
import EmergencyDetailsBlock from "../../components/EmergencyDetailsBlock/EmergencyDetailsBlock";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import getAge from "../../helpers/getAgeFromDate";
import { MainButton } from "../../components/Buttons/MainButton";

export default function EmeregencyClientDetails({ route, navigation }) {
  const [loadingCancelEmergency, setLoadingCancelEmergency] = useState(false);
  const [isServiceDone, setIsServiceDone] = useState(false);
  const service = route.params;

  const {
    price,
    id,
    title,
    description,
    clientId,
    meetingLatitude,
    meetingLongitude,
  } = service;
  console.log("Service Details:", service);

  useEffect(() => {
    setIsServiceDone(service.status === "D");
  }, [isServiceDone]);

  const results = useQueries({
    queries: [
      {
        queryKey: ["clientDetails", clientId],
        queryFn: () => Client.get(clientId),
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const [clientDetails] = results;
  const clientDetailsData = clientDetails.data?.data.data;
  const clientBirthDate = clientDetailsData?.birthDate;
  const age = getAge(clientBirthDate ?? "");
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.background,
        }}
      >
        <Text>حدث خطأ</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <EmergencyDetailsBlock title={title} description={description} />
        {
          <EmergencyCallBlock
            price={price}
            lawyerPhone={service.phone ?? null}
          />
        }
        <PreviewCard
          name={`${clientDetailsData.firstName} ${clientDetailsData.lastName}`}
          title={`${
            clientDetailsData.gender === 77 ? "رجل" : "سيدة"
          } ${age} سنة`}
          showImage
          img={clientDetailsData.mainImage}
        />
        <View style={styles.bookingContainer}>
          {meetingLatitude && meetingLongitude && (
            <View style={styles.buttonContainer}>
              <MainButton
                title="اظهار موقع العميل"
                disabled={isServiceDone}
                onPress={() => {
                  // open map with meetingLatitude and meetingLongitude using a map app
                  const url = `https://www.google.com/maps/search/?api=1&query=${meetingLatitude},${meetingLongitude}`;
                  Linking.openURL(url).catch((err) =>
                    Alert.alert("خطأ", "لا يمكن فتح الخريطة")
                  );
                }}
              />
            </View>
          )}
          <View style={styles.buttonContainer}>
            <MainButton
              disabled={isServiceDone}
              title="انهاء الطلب"
              onPress={async () => {
                try {
                  setLoadingCancelEmergency(true);
                  await EmeregencyCases.endEmergency(service.serviceId);
                  setLoadingCancelEmergency(false);
                  navigation.popToTop();
                } catch (error) {
                  console.error("Error ending emergency:", error);
                  Alert.alert("خطأ", "حدث خطأ أثناء انهاء الطلب");
                  setLoadingCancelEmergency(false);
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    flex: 1,
    width: "100%",
    height: 90,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 8,
    marginVertical: 5,
  },
  summaryContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    height: 110,
    justifyContent: "center",
  },
  bookingContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    // height: 110,
    paddingVertical: 25,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  pickerContainer: {
    width: "90%",
    height: 50,
    justifyContent: "center",
  },
  bookInfoOuterContainer: {
    height: 50,
    width: "100%",
    borderBottomColor: Colors.SecondaryColor,
    borderBottomWidth: 0.5,
    justifyContent: "center",
  },
  bookInfoInnerContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  Text: {
    paddingRight: 10,
    color: Colors.SecondaryColor,
  },
  buttonContainer: {
    alignSelf: "center",
    height: 36,
    width: "50%",
  },
});
