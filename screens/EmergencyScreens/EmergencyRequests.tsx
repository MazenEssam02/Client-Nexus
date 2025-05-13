import { StyleSheet, View, Text, FlatList, Alert } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useMutation } from "@tanstack/react-query";
import { EmeregencyCases } from "../..//API/https";
import { useState, useEffect, useLayoutEffect } from "react";
import { Platform } from "react-native";
import EventSource, { EventType } from "react-native-sse";
import { apiClient } from "../../API/https";
import EmergencyCard from "../../components/EmergencyLawyer Card/EmergencyCard";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";

export default function EmergencyRequests({ navigation }) {
  const route =
    useRoute<RouteProp<{ params: { emergencyCaseId: string } }, "params">>();
  const emergencyCaseId = route.params.emergencyCaseId;
  const [offers, setOffers] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { mutate: deleteEmergency } = useMutation({
    mutationFn: () => EmeregencyCases.deleteEmergency(emergencyCaseId),
    onSuccess: () => {
      navigation.goBack();
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("خطأ", "برجاء المحاولة مره اخري.");
    },
  });

  const handleBack = () => {
    Alert.alert(
      "الرجوع",
      "هل انت متأكد انك تريد الرجوع و الغاء الطلب",
      [
        {
          text: "الغاء",
          onPress: () => deleteEmergency(),
          style: "destructive",
        },
        {
          text: "البقاء",

          style: "cancel",
        },
      ],
      { cancelable: true, userInterfaceStyle: "light" }
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerLeft: () => (
        <Ionicons
          name="close-outline"
          size={30}
          color="white"
          onPress={handleBack}
        />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    if (!emergencyCaseId) return;

    const url = `${apiClient.defaults.baseURL}/api/emergency-cases/${emergencyCaseId}/offers-sse`;
    const token = `${apiClient.defaults.headers.common.Authorization}`;
    const eventSource = new EventSource(url, {
      headers: {
        Authorization: token,
        Connection: "keep-alive",
      },
    });

    eventSource.addEventListener("open", () => {
      console.log("SSE connection opened");
      setIsConnected(true);
      setError(null);
    });

    eventSource.addEventListener("offer" as EventType, (event) => {
      try {
        if ("data" in event) {
          const data = JSON.parse(event.data);
          setOffers((prev) => [...prev, data]);
        } else {
          console.error("Event does not contain data:", event);
        }
      } catch (err) {
        console.error("Error parsing SSE message:", err);
      }
    });

    eventSource.addEventListener("error", (err) => {
      console.error("SSE error:", err);
      const errorMessage =
        err instanceof ErrorEvent ? err.message : "An unknown error occurred";
      setError(new Error(errorMessage));
      setIsConnected(false);
    });

    // Connection is automatically established when EventSource is instantiated

    return () => {
      eventSource.close();
      console.log("SSE connection closed");
    };
  }, [emergencyCaseId]);

  return (
    <View style={styles.container}>
      {offers.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={offers}
          keyExtractor={(item) => item.ServiceProviderId}
          renderItem={({ item }) => (
            <EmergencyCard lawyer={item} emergencyCaseId={emergencyCaseId}  />
          )}
        />
      ) : (
        <Text style={styles.waitText}>فى انتظار قبول محامى للطلب ........</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,

    justifyContent: "center",
  },
  waitText: {
    ...font.headline,
    textAlign: "center",
  },
});
