import { StyleSheet, View, Text, FlatList, Alert } from "react-native";
import { Colors } from "../../constants/Color";
import { font } from "../../constants/Font";
import { useMutation } from "@tanstack/react-query";
import { EmeregencyCases } from "../..//API/https";
import { useState, useEffect, useLayoutEffect } from "react";
import { Platform } from "react-native";
import EventSource from "react-native-sse";
import { apiClient } from "../../API/https";
import EmergencyCard from "../../components/EmergencyLawyer Card/EmergencyCard";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";

export default function EmergencyRequests({ navigation }) {
  const route =
    useRoute<
      RouteProp<
        { params: { emergencyCaseId: string; emergencyCaseLimit: Number } },
        "params"
      >
    >();
  const emergencyCaseId = route.params.emergencyCaseId;
  const emergencyCaseLimit = route.params.emergencyCaseLimit;

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
    if (emergencyCaseId) {
      const path = `/api/emergency-cases/${emergencyCaseId}/offers-sse`;
      const url = `${apiClient.defaults.baseURL}${path}`;
      const authHeader =
        apiClient.defaults.headers.common["Authorization"] || "";

      const eventSource = new EventSource(url, {
        headers: {
          ...apiClient.defaults.headers.common,
          "Cache-Control": "no-cache",
          Accept: "text/event-stream",
        },
      });

      eventSource.addEventListener("open", () => {
        setIsConnected(true);
        setError(null);
        console.log("SSE connection opened");
      });

      eventSource.addEventListener("message", (event) => {
        try {
          const newOffer = JSON.parse(event.data);
          setOffers((prev) => [...prev, newOffer]);
          console.log("New offer received:", newOffer);
        } catch (err) {
          console.error("Error parsing offer:", err);
        }
      });
      eventSource.addEventListener("error", (event) => {
        if (event.type === "error") {
          console.error("SSE error:", event);
          setError(new Error("Connection error"));
          setIsConnected(false);
        }
      });

      eventSource.addEventListener("close", () => {
        console.log("SSE connection closed");
        setIsConnected(false);
      });

      return () => {
        eventSource.close();
      };
    }
  }, [emergencyCaseId]);

  return (
    <View style={styles.container}>
      {offers.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={offers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EmergencyCard lawyer={item} />}
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
