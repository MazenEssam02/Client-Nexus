import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ScreensWrapper from "../ScreensWrapper/ScreensWrapper";
import { useQuery } from "@tanstack/react-query";
import { Client, EmeregencyCases, ServiceProvider } from "../../API/https";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import IsError from "../../components/IsError/IsError";
import NoResponse from "../../components/NoResponse/NoResponse";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import EmergencyModal from "../../components/EmergencyModal/EmergencyModal";
import { useLocation } from "../../hooks/useLocation";

export default function EmergencyRequests({ navigation }) {
  const { loading, error: errorMsg, location: currentLocation } = useLocation();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["EmergencyRequests"],
    queryFn: () =>
      EmeregencyCases.getAvailableEmergencies(
        currentLocation?.longitude,
        currentLocation?.latitude
      ),
    enabled: !loading,
    refetchInterval: 3000,
  });
  const emergencyRequests = data?.data || [];
  const [selectedRequest, setSelectedRequest] = useState(null);

  if (isLoading || loading) {
    return <LoadingSpinner />;
  }
  if (isError || errorMsg) {
    return <IsError error={error || errorMsg} />;
  }

  if (emergencyRequests.length === 0) {
    return <NoResponse text="لا توجد طلبات طوارئ حالياً" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={emergencyRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PreviewCard
            key={item.serviceId}
            onPress={() => setSelectedRequest(item)}
            showImage={false}
            name={`${item.clientFirstName} ${item.clientLastName}`}
            desc={item.description}
            title={item.name}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <EmergencyModal
        visible={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        name={
          selectedRequest?.clientFirstName +
          " " +
          selectedRequest?.clientLastName
        }
        description={selectedRequest?.description}
        location={selectedRequest?.meetingTextAddress}
        title={selectedRequest?.name}
        id={selectedRequest?.serviceId}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    padding: 10,
  },
  containerWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.SecondaryColor,
  },
  contentArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.mainColor,
    height: 50,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  text: {
    ...font.title,
    color: "white",
    textAlign: "center",
  },
  activeText: {
    textDecorationLine: "underline",
    textDecorationColor: "white",
  },
  separator: {
    width: 1.5,
    height: "75%",
    backgroundColor: Colors.SecondaryColor,
  },
});
